import {
  HttpHandlerFn,
  HttpParams,
  HttpRequest,
  HttpRequestOptions,
  HttpResponse,
} from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { MockApiDatabase, mockInterceptor } from './mock.interceptor';

const MOCK_BASE_URL: string = 'https://nest.template.dev.28apps-software.de/';

type TestRequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type MockResponse = {
  total: number;
  records: Record<string, unknown>[];
};

describe('MockApiDatabase', () => {
  let database: MockApiDatabase;

  beforeEach(() => {
    database = new MockApiDatabase();
  });

  describe('GET', () => {
    it('should return three seeded records for each major resource', async () => {
      const resources: string[] = ['user', 'role', 'tenant', 'customers'];

      for (const resource of resources) {
        const response: HttpResponse<unknown> = (await sendRequest(
          database,
          'GET',
          resource,
        )) as HttpResponse<MockResponse>;
        const body: MockResponse = response.body as MockResponse;

        expect(body.total).toBe(3);
        expect(body.records.length).toBe(3);
      }
    });

    it('should filter records by search query', async () => {
      const request: HttpRequest<unknown> = createRequest(
        'GET',
        'user',
        undefined,
        { params: new HttpParams({ fromObject: { search: 'Max' } }) },
      );

      const response: HttpResponse<unknown> = (await firstValueFrom(
        database.respondToRequest(request),
      )) as HttpResponse<MockResponse>;
      const body: MockResponse = response.body as MockResponse;

      expect(body.total).toBe(1);
      expect(body.records[0]?.['firstName']).toBe('Max');
    });

    it('should filter records by active flag', async () => {
      const request: HttpRequest<unknown> = createRequest(
        'GET',
        'user',
        undefined,
        { params: new HttpParams({ fromObject: { active: 'false' } }) },
      );

      const response: HttpResponse<unknown> = (await firstValueFrom(
        database.respondToRequest(request),
      )) as HttpResponse<MockResponse>;
      const body: MockResponse = response.body as MockResponse;

      expect(body.total).toBe(1);
      expect(body.records[0]?.['lastName']).toBe('Doe');
    });

    it('should apply pagination', async () => {
      const request: HttpRequest<unknown> = createRequest(
        'GET',
        'tenant',
        undefined,
        { params: new HttpParams({ fromObject: { skip: '0', limit: '2' } }) },
      );

      const response: HttpResponse<unknown> = (await firstValueFrom(
        database.respondToRequest(request),
      )) as HttpResponse<MockResponse>;
      const body: MockResponse = response.body as MockResponse;

      expect(body.total).toBe(3);
      expect(body.records.length).toBe(2);
    });

    it('should sort records', async () => {
      const request: HttpRequest<unknown> = createRequest(
        'GET',
        'tenant',
        undefined,
        { params: new HttpParams({ fromObject: { sort: 'name,DESC' } }) },
      );

      const response: HttpResponse<unknown> = (await firstValueFrom(
        database.respondToRequest(request),
      )) as HttpResponse<MockResponse>;
      const body: MockResponse = response.body as MockResponse;

      expect(body.records[0]?.['name']).toBe('Initech AG');
      expect(body.records[2]?.['name']).toBe('Acme GmbH');
    });

    it('should return a single record by id', async () => {
      const response: HttpResponse<unknown> = (await sendRequest(
        database,
        'GET',
        'tenant/be9733b2-7695-4a41-96ed-9c0fcb2772dd',
      )) as HttpResponse<Record<string, unknown>>;
      const body: Record<string, unknown> = response.body as Record<
        string,
        unknown
      >;

      expect(body['name']).toBe('Acme GmbH');
    });

    it('should return 404 for an unknown record id', async () => {
      await expectRejectsWithStatus(database, 'GET', 'tenant/unknown-id', 404);
    });

    it('should return 404 for an unknown resource', async () => {
      await expectRejectsWithStatus(database, 'GET', 'unknown-resource', 404);
    });
  });

  describe('AUTH', () => {
    it('should simulate a successful login', async () => {
      const response: HttpResponse<unknown> = (await sendRequest(
        database,
        'POST',
        'auth/login',
        { username: 'admin@acme-gmbh.de', password: 'MockPasswort123!' },
      )) as HttpResponse<Record<string, unknown>>;
      const body: Record<string, unknown> = response.body as Record<
        string,
        unknown
      >;

      expect(body['access_token']).toBeDefined();
      expect(body['refresh_token']).toBeDefined();
      expect((body['user'] as Record<string, unknown>)?.['email']).toBe(
        'admin@acme-gmbh.de',
      );
    });

    it('should simulate a token refresh', async () => {
      const response: HttpResponse<unknown> = (await sendRequest(
        database,
        'POST',
        'auth/refreshToken',
        { refreshToken: 'mock-refresh-token' },
      )) as HttpResponse<Record<string, unknown>>;
      const body: Record<string, unknown> = response.body as Record<
        string,
        unknown
      >;

      expect(body['status']).toBe(201);
    });
  });

  describe('CRUD', () => {
    it('should create, update and delete a record', async () => {
      const createResponse: HttpResponse<unknown> = (await sendRequest(
        database,
        'POST',
        'customers',
        { name: 'Testkunde XYZ' },
      )) as HttpResponse<Record<string, unknown>>;
      const createdRecord: Record<string, unknown> =
        createResponse.body as Record<string, unknown>;
      const createdId: string = createdRecord['id'] as string;

      expect(createdId).toBeDefined();
      expect(createdRecord['name']).toBe('Testkunde XYZ');

      const listAfterCreate: HttpResponse<unknown> = (await sendRequest(
        database,
        'GET',
        'customers',
      )) as HttpResponse<MockResponse>;
      expect((listAfterCreate.body as MockResponse).total).toBe(4);

      const updateResponse: HttpResponse<unknown> = (await sendRequest(
        database,
        'PATCH',
        `customers/${createdId}`,
        { name: 'Testkunde ABC' },
      )) as HttpResponse<Record<string, unknown>>;

      expect((updateResponse.body as Record<string, unknown>)['name']).toBe(
        'Testkunde ABC',
      );

      const deleteResponse: HttpResponse<unknown> = (await sendRequest(
        database,
        'DELETE',
        `customers/${createdId}`,
      )) as HttpResponse<Record<string, unknown>>;

      expect(deleteResponse.body).toEqual({});

      const listAfterDelete: HttpResponse<unknown> = (await sendRequest(
        database,
        'GET',
        'customers',
      )) as HttpResponse<MockResponse>;
      expect((listAfterDelete.body as MockResponse).total).toBe(3);
    });

    it('should delete all records of a resource', async () => {
      const deleteAllResponse: HttpResponse<unknown> = (await sendRequest(
        database,
        'DELETE',
        'role',
      )) as HttpResponse<Record<string, unknown>>;

      expect(deleteAllResponse.body).toEqual({});

      const listAfterDeleteAll: HttpResponse<unknown> = (await sendRequest(
        database,
        'GET',
        'role',
      )) as HttpResponse<MockResponse>;
      expect((listAfterDeleteAll.body as MockResponse).total).toBe(0);
    });

    it('should return 404 when updating an unknown record', async () => {
      await expectRejectsWithStatus(database, 'PATCH', 'user/unknown-id', 404);
    });

    it('should return 404 when deleting an unknown record', async () => {
      await expectRejectsWithStatus(
        database,
        'DELETE',
        'tenant/unknown-id',
        404,
      );
    });
  });
});

describe('mockInterceptor', () => {
  it('should pass through requests when mock mode is disabled', async () => {
    const nextHandler: HttpHandlerFn = vi.fn(() =>
      of(new HttpResponse({ status: 200, body: null })),
    );
    const request: HttpRequest<unknown> = new HttpRequest(
      'GET',
      `${MOCK_BASE_URL}user`,
    );

    const response: unknown = await firstValueFrom(
      mockInterceptor(request, nextHandler),
    );

    expect(nextHandler).toHaveBeenCalledWith(request);
    expect((response as HttpResponse<unknown>).status).toBe(200);
  });
});

function sendRequest(
  database: MockApiDatabase,
  method: TestRequestMethod,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const request: HttpRequest<unknown> = createRequest(method, path, body);
  return firstValueFrom(database.respondToRequest(request));
}

function createRequest(
  method: TestRequestMethod,
  path: string,
  body?: unknown,
  options?: HttpRequestOptions,
): HttpRequest<unknown> {
  return new HttpRequest(
    method,
    `${MOCK_BASE_URL}${path}`,
    body ?? null,
    options ?? {},
  );
}

async function expectRejectsWithStatus(
  database: MockApiDatabase,
  method: TestRequestMethod,
  path: string,
  expectedStatus: number = 404,
): Promise<void> {
  await expect(sendRequest(database, method, path)).rejects.toMatchObject({
    status: expectedStatus,
  });
}
