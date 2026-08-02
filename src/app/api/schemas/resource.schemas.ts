import { z } from 'zod';
import { Customer } from '../../models/Customer';
import { Role } from '../../models/Role';
import { Tenant } from '../../models/Tenant';
import { User } from '../../models/User';
import { type ApiResponseSchema, createPaginatedResponseSchema, type PaginatedApiResponse } from './common.schemas';

type UserApiResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  tenantId?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  active: boolean;
  inviteAcceptedAt?: string | null;
  language?: 'de' | 'en';
  roleId?: string | null;
  password?: string | null;
  [key: string]: unknown;
};

const userApiResponseSchema: ApiResponseSchema<UserApiResponse> = z
  .object({
    id: z.string().min(1),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    tenantId: z.string().nullable().optional(),
    email: z.email(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    active: z.boolean(),
    inviteAcceptedAt: z.iso.datetime().nullable().optional(),
    language: z.enum(['de', 'en']).optional(),
    roleId: z.string().nullable().optional(),
    password: z.string().nullable().optional(),
  })
  .passthrough();

function createUserModel(userResponse: UserApiResponse): User {
  const user: User = new User({});
  Object.assign(user, userResponse);
  return user;
}

export const userResponseSchema: ApiResponseSchema<User> = userApiResponseSchema.transform(createUserModel);

export const userListResponseSchema: ApiResponseSchema<PaginatedApiResponse<User>> =
  createPaginatedResponseSchema(userResponseSchema);

type TenantApiResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  [key: string]: unknown;
};

const tenantApiResponseSchema: ApiResponseSchema<TenantApiResponse> = z
  .object({
    id: z.string().min(1),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    name: z.string().min(1),
  })
  .passthrough();

function createTenantModel(tenantResponse: TenantApiResponse): Tenant {
  const tenant: Tenant = new Tenant({});
  Object.assign(tenant, tenantResponse);
  return tenant;
}

export const tenantResponseSchema: ApiResponseSchema<Tenant> = tenantApiResponseSchema.transform(createTenantModel);

export const tenantListResponseSchema: ApiResponseSchema<PaginatedApiResponse<Tenant>> =
  createPaginatedResponseSchema(tenantResponseSchema);

type RolePermission =
  | 'FILE_READ'
  | 'FILE_READ_OWN'
  | 'FILE_CREATE'
  | 'FILE_UPDATE'
  | 'FILE_UPDATE_OWN'
  | 'FILE_DELETE'
  | 'FILE_DELETE_OWN'
  | 'ROLE_READ'
  | 'ROLE_READ_OWN'
  | 'ROLE_CREATE'
  | 'ROLE_UPDATE'
  | 'ROLE_DELETE'
  | 'TENANT_READ'
  | 'TENANT_READ_OWN'
  | 'TENANT_CREATE'
  | 'TENANT_UPDATE'
  | 'TENANT_UPDATE_OWN'
  | 'TENANT_DELETE'
  | 'TENANT_DELETE_OWN'
  | 'USER_READ'
  | 'USER_READ_OWN'
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'USER_UPDATE_OWN'
  | 'USER_DELETE'
  | 'USER_DELETE_OWN'
  | 'KPI_TENANT';

const ROLE_PERMISSION_VALUES: readonly [RolePermission, ...RolePermission[]] = [
  'FILE_READ',
  'FILE_READ_OWN',
  'FILE_CREATE',
  'FILE_UPDATE',
  'FILE_UPDATE_OWN',
  'FILE_DELETE',
  'FILE_DELETE_OWN',
  'ROLE_READ',
  'ROLE_READ_OWN',
  'ROLE_CREATE',
  'ROLE_UPDATE',
  'ROLE_DELETE',
  'TENANT_READ',
  'TENANT_READ_OWN',
  'TENANT_CREATE',
  'TENANT_UPDATE',
  'TENANT_UPDATE_OWN',
  'TENANT_DELETE',
  'TENANT_DELETE_OWN',
  'USER_READ',
  'USER_READ_OWN',
  'USER_CREATE',
  'USER_UPDATE',
  'USER_UPDATE_OWN',
  'USER_DELETE',
  'USER_DELETE_OWN',
  'KPI_TENANT',
];

type RoleApiResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  tenantId?: string | null;
  name: string;
  description: string;
  global: boolean;
  draft: boolean;
  superAdmin: boolean;
  tenantAdmin: boolean;
  permissions: RolePermission[];
  [key: string]: unknown;
};

const roleApiResponseSchema: ApiResponseSchema<RoleApiResponse> = z
  .object({
    id: z.string().min(1),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    tenantId: z.string().nullable().optional(),
    name: z.string().min(1),
    description: z.string(),
    global: z.boolean(),
    draft: z.boolean(),
    superAdmin: z.boolean(),
    tenantAdmin: z.boolean(),
    permissions: z.enum(ROLE_PERMISSION_VALUES).array(),
  })
  .passthrough();

function createRoleModel(roleResponse: RoleApiResponse): Role {
  const role: Role = new Role({});
  Object.assign(role, roleResponse);
  return role;
}

export const roleResponseSchema: ApiResponseSchema<Role> = roleApiResponseSchema.transform(createRoleModel);

export const roleListResponseSchema: ApiResponseSchema<PaginatedApiResponse<Role>> =
  createPaginatedResponseSchema(roleResponseSchema);

type CustomerApiResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  [key: string]: unknown;
};

const customerApiResponseSchema: ApiResponseSchema<CustomerApiResponse> = z
  .object({
    id: z.string().min(1),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    name: z.string().min(1),
  })
  .passthrough();

function createCustomerModel(customerResponse: CustomerApiResponse): Customer {
  const customer: Customer = new Customer({});
  Object.assign(customer, customerResponse);
  return customer;
}

export const customerResponseSchema: ApiResponseSchema<Customer> =
  customerApiResponseSchema.transform(createCustomerModel);

export const customerListResponseSchema: ApiResponseSchema<PaginatedApiResponse<Customer>> =
  createPaginatedResponseSchema(customerResponseSchema);
