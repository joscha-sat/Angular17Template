import {
  HttpErrorResponse,
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpParams,
  type HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { delay, type Observable, of, throwError } from 'rxjs';
import { environment } from '../../other/environments/environment';

const MOCK_LATENCY_MS: number = 400;

const MOCK_ACCESS_TOKEN: string = 'mock-access-token';
const MOCK_REFRESH_TOKEN: string = 'mock-refresh-token';

const AUTH_RESOURCE_NAME: string = 'auth';
const LOGIN_ACTION_NAME: string = 'login';
const REFRESH_TOKEN_ACTION_NAME: string = 'refreshToken';
const TOKEN_REFRESH_SUCCESS_STATUS: number = 201;

const DEFAULT_TENANT_ID: string = 'be9733b2-7695-4a41-96ed-9c0fcb2772dd';

const SORT_DIRECTION_SEPARATOR: string = ',';
const ASCENDING_SORT_DIRECTION: string = 'ASC';

type MockResourceName = 'user' | 'role' | 'tenant' | 'customers';

type MockRecord = {
  id: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  [key: string]: unknown;
};

type MockRoute = {
  resource: MockResourceName | null;
  idOrAction: string | null;
};

export class MockApiDatabase {
  private readonly tenants: MockRecord[] = createMockTenants();
  private readonly roles: MockRecord[] = createMockRoles();
  private readonly users: MockRecord[] = createMockUsers();
  private readonly customers: MockRecord[] = createMockCustomers();

  respondToRequest(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const route: MockRoute = this.parseRoute(req.url);
    const resource: MockResourceName | null = route.resource;

    if (!resource) {
      return this.createNotFoundResponse(req.url);
    }

    if (resource === AUTH_RESOURCE_NAME) {
      return this.respondToAuthRequest(route.idOrAction, req.url);
    }

    return this.respondToResourceRequest(resource, route, req);
  }

  // CRUD > Resource by HTTP method
  private respondToResourceRequest(
    resource: MockResourceName,
    route: MockRoute,
    req: HttpRequest<unknown>,
  ): Observable<HttpEvent<unknown>> {
    switch (req.method) {
      case 'GET':
        return this.respondToGetRequest(resource, route, req);
      case 'POST':
        return this.createOneRecord(resource, req.body);
      case 'PATCH':
        return this.respondToPatchRequest(resource, route, req);
      case 'DELETE':
        return this.respondToDeleteRequest(resource, route, req);
      default:
        return this.createNotFoundResponse(req.url);
    }
  }

  // GET ONE / ALL > Record
  private respondToGetRequest(
    resource: MockResourceName,
    route: MockRoute,
    req: HttpRequest<unknown>,
  ): Observable<HttpEvent<unknown>> {
    if (route.idOrAction) {
      return this.getOneRecord(resource, route.idOrAction, req.url);
    }

    return this.getAllRecords(resource, req.params);
  }

  // PATCH / UPDATE ONE > Record
  private respondToPatchRequest(
    resource: MockResourceName,
    route: MockRoute,
    req: HttpRequest<unknown>,
  ): Observable<HttpEvent<unknown>> {
    if (route.idOrAction) {
      return this.updateOneRecord(resource, route.idOrAction, req.body, req.url);
    }

    return this.createNotFoundResponse(req.url);
  }

  // DELETE ONE / ALL > Records
  private respondToDeleteRequest(
    resource: MockResourceName,
    route: MockRoute,
    req: HttpRequest<unknown>,
  ): Observable<HttpEvent<unknown>> {
    if (route.idOrAction) {
      return this.deleteOneRecord(resource, route.idOrAction, req.url);
    }

    return this.deleteAllRecords(resource);
  }

  // AUTH > Login & RefreshToken
  private respondToAuthRequest(action: string | null, url: string): Observable<HttpEvent<unknown>> {
    if (action === LOGIN_ACTION_NAME) {
      return this.createSuccessResponse(this.createLoginResponse());
    }

    if (action === REFRESH_TOKEN_ACTION_NAME) {
      return this.createSuccessResponse(this.createRefreshTokenResponse());
    }

    return this.createNotFoundResponse(url);
  }

  // GET ALL > Records
  private getAllRecords(resource: MockResourceName, params: HttpParams): Observable<HttpEvent<unknown>> {
    const records: MockRecord[] = this.getRecords(resource);

    let filteredRecords: MockRecord[] = this.applySearchFilter(records, params.get('search'));
    filteredRecords = this.applyActiveFilter(filteredRecords, params.get('active'));
    filteredRecords = this.applySort(filteredRecords, params.get('sort'));

    const total: number = filteredRecords.length;
    const skip: number = Number(params.get('skip') ?? 0);
    const limit: number = Number(params.get('limit') ?? total);
    const pagedRecords: MockRecord[] = filteredRecords.slice(skip, skip + limit);

    return this.createSuccessResponse({ total, records: pagedRecords });
  }

  // GET ONE > Record
  private getOneRecord(resource: MockResourceName, id: string, url: string): Observable<HttpEvent<unknown>> {
    const foundRecord: MockRecord | undefined = this.findRecordById(resource, id);

    if (!foundRecord) {
      return this.createNotFoundResponse(url);
    }

    return this.createSuccessResponse(foundRecord);
  }

  // CREATE ONE > Record
  private createOneRecord(resource: MockResourceName, body: unknown): Observable<HttpEvent<unknown>> {
    const now: string = new Date().toISOString();
    const newRecord: MockRecord = {
      ...(body as MockRecord),
      id: createRecordId(),
      createdAt: now,
      updatedAt: now,
    };

    this.getRecords(resource).unshift(newRecord);

    return this.createSuccessResponse(newRecord);
  }

  // PATCH / UPDATE ONE > Record
  private updateOneRecord(
    resource: MockResourceName,
    id: string,
    body: unknown,
    url: string,
  ): Observable<HttpEvent<unknown>> {
    const records: MockRecord[] = this.getRecords(resource);
    const index: number = this.findRecordIndex(records, id);

    if (index === -1) {
      return this.createNotFoundResponse(url);
    }

    const updatedRecord: MockRecord = {
      ...records[index],
      ...(body as MockRecord),
      id: records[index].id,
      createdAt: records[index].createdAt,
      updatedAt: new Date().toISOString(),
    };
    records[index] = updatedRecord;

    return this.createSuccessResponse(updatedRecord);
  }

  // DELETE ONE > Record
  private deleteOneRecord(resource: MockResourceName, id: string, url: string): Observable<HttpEvent<unknown>> {
    const records: MockRecord[] = this.getRecords(resource);
    const index: number = this.findRecordIndex(records, id);

    if (index === -1) {
      return this.createNotFoundResponse(url);
    }

    records.splice(index, 1);

    return this.createSuccessResponse({ affected: 1 });
  }

  // DELETE ALL > Records
  private deleteAllRecords(resource: MockResourceName): Observable<HttpEvent<unknown>> {
    const records: MockRecord[] = this.getRecords(resource);
    const affected: number = records.length;
    records.length = 0;

    return this.createSuccessResponse({ affected });
  }

  private createLoginResponse(): unknown {
    const superAdminUser: MockRecord | undefined = this.users.find(
      (user: MockRecord) => user['email'] === 'admin@acme-gmbh.de',
    );

    return {
      access_token: MOCK_ACCESS_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
      user: superAdminUser ?? this.users[0],
    };
  }

  private createRefreshTokenResponse(): unknown {
    return {
      status: TOKEN_REFRESH_SUCCESS_STATUS,
      data: {
        access: MOCK_ACCESS_TOKEN,
        refresh: MOCK_REFRESH_TOKEN,
        user: this.users[0],
      },
    };
  }

  private parseRoute(url: string): MockRoute {
    const urlWithoutQuery: string = url.split('?')[0];
    const pathWithoutBaseUrl: string = urlWithoutQuery.replace(environment.baseUrl, '');
    const segments: string[] = pathWithoutBaseUrl.split('/').filter(Boolean);
    const resourceName: string = segments[0] ?? '';
    const idOrAction: string | null = segments.length > 1 ? segments[1] : null;

    return {
      resource: this.isMockResource(resourceName) ? (resourceName as MockResourceName) : null,
      idOrAction,
    };
  }

  private isMockResource(resourceName: string): boolean {
    return (
      resourceName === AUTH_RESOURCE_NAME ||
      resourceName === 'user' ||
      resourceName === 'role' ||
      resourceName === 'tenant' ||
      resourceName === 'customers'
    );
  }

  private getRecords(resource: MockResourceName): MockRecord[] {
    switch (resource) {
      case 'user':
        return this.users;
      case 'role':
        return this.roles;
      case 'tenant':
        return this.tenants;
      case 'customers':
        return this.customers;
      default:
        return [];
    }
  }

  private findRecordById(resource: MockResourceName, id: string | null): MockRecord | undefined {
    return this.getRecords(resource).find((record: MockRecord) => record.id === id);
  }

  private findRecordIndex(records: MockRecord[], id: string): number {
    return records.findIndex((record: MockRecord) => record.id === id);
  }

  private applySearchFilter(records: MockRecord[], searchQuery: string | null): MockRecord[] {
    if (!searchQuery) {
      return records;
    }

    const normalizedQuery: string = searchQuery.toLowerCase();
    return records.filter((record: MockRecord) =>
      Object.values(record).some((value: unknown) => {
        const isMatchingString: boolean = typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);
        return isMatchingString;
      }),
    );
  }

  private applyActiveFilter(records: MockRecord[], activeParam: string | null): MockRecord[] {
    if (activeParam === null) {
      return records;
    }

    const isActive: boolean = activeParam === 'true';
    return records.filter((record: MockRecord) => record['active'] === isActive);
  }

  private applySort(records: MockRecord[], sortParam: string | null): MockRecord[] {
    if (!sortParam) {
      return records;
    }

    const sortParts: string[] = sortParam.split(SORT_DIRECTION_SEPARATOR);
    const field: string = sortParts[0];
    const isAscending: boolean = sortParts.length > 1 && sortParts[1].toUpperCase() === ASCENDING_SORT_DIRECTION;

    return [...records].sort((recordA: MockRecord, recordB: MockRecord) => {
      const comparison: number = this.compareValues(recordA[field], recordB[field]);
      return isAscending ? comparison : -comparison;
    });
  }

  private compareValues(valueA: unknown, valueB: unknown): number {
    if (valueA === valueB) {
      return 0;
    }

    const missingValueComparison: number | null = this.compareMissingValue(valueA, valueB);
    if (missingValueComparison !== null) {
      return missingValueComparison;
    }

    return this.compareDefinedValues(valueA, valueB);
  }

  private compareMissingValue(valueA: unknown, valueB: unknown): number | null {
    if (valueA === undefined || valueA === null) {
      return -1;
    }

    if (valueB === undefined || valueB === null) {
      return 1;
    }

    return null;
  }

  private compareDefinedValues(valueA: unknown, valueB: unknown): number {
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return String(valueA).localeCompare(String(valueB));
  }

  private createSuccessResponse(body: unknown): Observable<HttpResponse<unknown>> {
    return of(new HttpResponse({ status: 200, body }));
  }

  private createNotFoundResponse(url: string): Observable<never> {
    return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found', url }));
  }
}

/**
 * Intercepts all HTTP requests when the environment flag "mock" is enabled
 * and simulates the backend with an in-memory database.
 */
export const mockInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  // Only API requests are mocked; asset requests (e.g. transloco i18n files)
  // must pass through to the real HTTP client.
  if (!environment.mock || !req.url.startsWith(environment.baseUrl)) {
    return next(req);
  }

  const mockResponse: Observable<HttpEvent<unknown>> = mockApiDatabase.respondToRequest(req);

  return mockResponse.pipe(delay(MOCK_LATENCY_MS));
};

const mockApiDatabase: MockApiDatabase = new MockApiDatabase();

function createMockTenants(): MockRecord[] {
  const createdAt: string = daysAgo(30);
  return [
    {
      id: DEFAULT_TENANT_ID,
      name: 'Acme GmbH',
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: 'mock-tenant-2',
      name: 'Globex Corporation',
      createdAt: daysAgo(18),
      updatedAt: daysAgo(2),
    },
    {
      id: 'mock-tenant-3',
      name: 'Initech AG',
      createdAt: daysAgo(6),
      updatedAt: daysAgo(6),
    },
  ];
}

function createMockRoles(): MockRecord[] {
  return [
    {
      id: 'mock-role-1',
      tenantId: DEFAULT_TENANT_ID,
      name: 'Super Admin',
      description: 'Full access to all tenants and resources.',
      global: true,
      draft: false,
      superAdmin: true,
      tenantAdmin: false,
      permissions: [
        'FILE_READ',
        'FILE_CREATE',
        'FILE_UPDATE',
        'FILE_DELETE',
        'ROLE_READ',
        'ROLE_CREATE',
        'ROLE_UPDATE',
        'ROLE_DELETE',
        'TENANT_READ',
        'TENANT_CREATE',
        'TENANT_UPDATE',
        'TENANT_DELETE',
        'USER_READ',
        'USER_CREATE',
        'USER_UPDATE',
        'USER_DELETE',
        'KPI_TENANT',
      ],
      createdAt: daysAgo(30),
      updatedAt: daysAgo(30),
    },
    {
      id: 'mock-role-2',
      tenantId: DEFAULT_TENANT_ID,
      name: 'Tenant Admin',
      description: 'Manages users and roles within one tenant.',
      global: false,
      draft: false,
      superAdmin: false,
      tenantAdmin: true,
      permissions: [
        'FILE_READ',
        'FILE_CREATE',
        'FILE_UPDATE_OWN',
        'FILE_DELETE_OWN',
        'ROLE_READ',
        'ROLE_UPDATE',
        'TENANT_READ',
        'TENANT_UPDATE_OWN',
        'USER_READ',
        'USER_CREATE',
        'USER_UPDATE',
        'USER_DELETE',
        'KPI_TENANT',
      ],
      createdAt: daysAgo(20),
      updatedAt: daysAgo(20),
    },
    {
      id: 'mock-role-3',
      tenantId: 'mock-tenant-2',
      name: 'Mitarbeiter',
      description: 'Standard employee role with basic access.',
      global: false,
      draft: false,
      superAdmin: false,
      tenantAdmin: false,
      permissions: ['FILE_READ', 'FILE_CREATE', 'FILE_UPDATE_OWN'],
      createdAt: daysAgo(10),
      updatedAt: daysAgo(10),
    },
  ];
}

function createMockUsers(): MockRecord[] {
  return [
    {
      id: 'mock-user-1',
      tenantId: DEFAULT_TENANT_ID,
      roleId: 'mock-role-1',
      email: 'admin@acme-gmbh.de',
      firstName: 'Max',
      lastName: 'Mustermann',
      password: 'MockPasswort123!',
      phone: '+49 30 12345678',
      active: true,
      inviteAcceptedAt: daysAgo(25),
      createdAt: daysAgo(28),
      updatedAt: daysAgo(3),
      role: {
        id: 'mock-role-1',
        name: 'Super Admin',
        superAdmin: true,
      },
      tenant: {
        id: DEFAULT_TENANT_ID,
        name: 'Acme GmbH',
      },
    },
    {
      id: 'mock-user-2',
      tenantId: DEFAULT_TENANT_ID,
      roleId: 'mock-role-2',
      email: 'erika@acme-gmbh.de',
      firstName: 'Erika',
      lastName: 'Musterfrau',
      password: 'MockPasswort123!',
      phone: '+49 30 87654321',
      active: true,
      inviteAcceptedAt: daysAgo(15),
      createdAt: daysAgo(17),
      updatedAt: daysAgo(17),
      role: {
        id: 'mock-role-2',
        name: 'Tenant Admin',
        superAdmin: false,
      },
      tenant: {
        id: DEFAULT_TENANT_ID,
        name: 'Acme GmbH',
      },
    },
    {
      id: 'mock-user-3',
      tenantId: 'mock-tenant-2',
      roleId: 'mock-role-3',
      email: 'john.doe@globex.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'MockPasswort123!',
      phone: '+49 40 5551234',
      active: false,
      inviteAcceptedAt: undefined,
      createdAt: daysAgo(9),
      updatedAt: daysAgo(9),
      role: {
        id: 'mock-role-3',
        name: 'Mitarbeiter',
        superAdmin: false,
      },
      tenant: {
        id: 'mock-tenant-2',
        name: 'Globex Corporation',
      },
    },
  ];
}

function createMockCustomers(): MockRecord[] {
  return [
    {
      id: 'mock-customer-1',
      name: 'Musterkunde GmbH',
      createdAt: daysAgo(12),
      updatedAt: daysAgo(1),
    },
    {
      id: 'mock-customer-2',
      name: 'Beispiel AG',
      createdAt: daysAgo(7),
      updatedAt: daysAgo(7),
    },
    {
      id: 'mock-customer-3',
      name: 'Demo & Test KG',
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
  ];
}

function createRecordId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function daysAgo(days: number): string {
  const date: Date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}
