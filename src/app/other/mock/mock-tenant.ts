import { ApiRoutes } from '../enums/api_routes';
import { createMockResource, MockResource } from './mock-resource';

export const mockTenant: MockResource = createMockResource([
  {
    id: 'tenant-1',
    name: 'Demo Tenant',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'tenant-2',
    name: 'Engineering Tenant',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'tenant-3',
    name: 'Operations Tenant',
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
]);

export const mockTenantRoute: ApiRoutes = ApiRoutes.TENANT;
