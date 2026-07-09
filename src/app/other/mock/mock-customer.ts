import { ApiRoutes } from '../enums/api_routes';
import { createMockResource, MockResource } from './mock-resource';

export const mockCustomer: MockResource = createMockResource([
  {
    id: 'customer-1',
    name: 'Demo Customer',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'customer-2',
    name: 'Engineering Customer',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'customer-3',
    name: 'Operations Customer',
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
]);

export const mockCustomerRoute: ApiRoutes = ApiRoutes.CUSTOMERS;
