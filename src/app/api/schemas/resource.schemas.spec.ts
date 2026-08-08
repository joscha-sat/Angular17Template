import { Customer } from '../../models/Customer';
import { Role } from '../../models/Role';
import { Tenant } from '../../models/Tenant';
import { User } from '../../models/User';
import {
  customerListResponseSchema,
  customerResponseSchema,
  roleListResponseSchema,
  roleResponseSchema,
  tenantListResponseSchema,
  tenantResponseSchema,
  userListResponseSchema,
  userResponseSchema,
} from './resource.schemas';
import { z } from 'zod';

const CREATED_AT: string = '2026-01-01T00:00:00.000Z';
const UPDATED_AT: string = '2026-01-02T00:00:00.000Z';

const validUserResponse: Record<string, unknown> = {
  id: 'user-1',
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
  tenantId: 'tenant-1',
  email: 'user@example.com',
  firstName: 'Test',
  lastName: 'User',
  phone: '+49 30 12345678',
  active: true,
  inviteAcceptedAt: null,
  language: 'de',
  roleId: 'role-1',
};

const validRoleResponse: Record<string, unknown> = {
  id: 'role-1',
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
  tenantId: 'tenant-1',
  name: 'Administrator',
  description: 'Full access',
  global: false,
  draft: false,
  superAdmin: true,
  tenantAdmin: true,
  permissions: ['USER_READ'],
};

const validTenantResponse: Record<string, unknown> = {
  id: 'tenant-1',
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
  name: 'Acme GmbH',
};

const validCustomerResponse: Record<string, unknown> = {
  id: 'customer-1',
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
  name: 'Example GmbH',
};

describe('resource response schemas', () => {
  it('transforms validated records into model instances', () => {
    expect(userResponseSchema.parse(validUserResponse)).toBeInstanceOf(User);
    expect(roleResponseSchema.parse(validRoleResponse)).toBeInstanceOf(Role);
    expect(tenantResponseSchema.parse(validTenantResponse)).toBeInstanceOf(Tenant);
    expect(customerResponseSchema.parse(validCustomerResponse)).toBeInstanceOf(Customer);
  });

  it('rejects the test username in regular user resource responses', () => {
    const invalidUserResponse: Record<string, unknown> = {
      ...validUserResponse,
      email: 'admin',
    };

    expect(() => userResponseSchema.parse(invalidUserResponse)).toThrow(z.ZodError);
  });

  it('transforms validated list records into model instances', () => {
    const userResponse: { total: number; records: User[] } = userListResponseSchema.parse({
      total: 1,
      records: [validUserResponse],
    });
    const roleResponse: { total: number; records: Role[] } = roleListResponseSchema.parse({
      total: 1,
      records: [validRoleResponse],
    });
    const tenantResponse: { total: number; records: Tenant[] } = tenantListResponseSchema.parse({
      total: 1,
      records: [validTenantResponse],
    });
    const customerResponse: { total: number; records: Customer[] } = customerListResponseSchema.parse({
      total: 1,
      records: [validCustomerResponse],
    });

    expect(userResponse.records[0]).toBeInstanceOf(User);
    expect(roleResponse.records[0]).toBeInstanceOf(Role);
    expect(tenantResponse.records[0]).toBeInstanceOf(Tenant);
    expect(customerResponse.records[0]).toBeInstanceOf(Customer);
  });

  it('accepts the system administrator username in user lists', () => {
    const userResponse: { total: number; records: User[] } = userListResponseSchema.parse({
      total: 2,
      records: [
        validUserResponse,
        {
          ...validUserResponse,
          id: 'system-user-1',
          tenantId: null,
          email: 'admin',
          firstName: 'super',
          lastName: 'admin',
        },
      ],
    });

    expect(userResponse.records).toHaveLength(2);
    expect(userResponse.records[1]).toBeInstanceOf(User);
    expect(userResponse.records[1].email).toBe('admin');
  });

  it('rejects unknown role permissions', () => {
    const invalidRoleResponse: Record<string, unknown> = {
      ...validRoleResponse,
      permissions: ['UNKNOWN_PERMISSION'],
    };

    expect(() => roleResponseSchema.parse(invalidRoleResponse)).toThrow(z.ZodError);
  });
});
