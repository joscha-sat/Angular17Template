import { ApiRoutes } from '../enums/api_routes';
import { createMockResource, MockResource } from './mock-resource';

export const mockRole: MockResource = createMockResource([
  {
    id: 'role-1',
    tenantId: 'tenant-1',
    name: 'Developer',
    description: 'Full access for local development.',
    global: true,
    draft: false,
    superAdmin: true,
    tenantAdmin: true,
    permissions: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'role-2',
    tenantId: 'tenant-2',
    name: 'Manager',
    description: 'Management access for the engineering tenant.',
    global: false,
    draft: false,
    superAdmin: false,
    tenantAdmin: true,
    permissions: ['USER_READ', 'USER_UPDATE', 'TENANT_READ'],
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'role-3',
    tenantId: 'tenant-3',
    name: 'Viewer',
    description: 'Read-only access for the operations tenant.',
    global: false,
    draft: false,
    superAdmin: false,
    tenantAdmin: false,
    permissions: ['USER_READ', 'TENANT_READ'],
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
]);

export const mockRoleRoute: ApiRoutes = ApiRoutes.ROLE;
