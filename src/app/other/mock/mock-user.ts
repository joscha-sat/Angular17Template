import { ApiRoutes } from '../enums/api_routes';
import { createMockResource, MockResource } from './mock-resource';

export const mockUser: MockResource = createMockResource([
  {
    id: 'user-1',
    tenantId: 'tenant-1',
    roleId: 'role-1',
    firstName: 'Developer',
    lastName: 'User',
    email: 'developer@example.com',
    phone: '+49 000 000000',
    password: '',
    active: true,
    inviteAcceptedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'user-2',
    tenantId: 'tenant-2',
    roleId: 'role-2',
    firstName: 'Alex',
    lastName: 'Manager',
    email: 'alex.manager@example.com',
    phone: '+49 000 000001',
    password: '',
    active: true,
    inviteAcceptedAt: '2026-01-02T00:00:00.000Z',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'user-3',
    tenantId: 'tenant-3',
    roleId: 'role-3',
    firstName: 'Jordan',
    lastName: 'Operator',
    email: 'jordan.operator@example.com',
    phone: '+49 000 000002',
    password: '',
    active: false,
    inviteAcceptedAt: undefined,
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
]);

export const mockUserRoute: ApiRoutes = ApiRoutes.USER;
