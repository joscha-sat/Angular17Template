import { BaseModel } from './BaseModel';
import type { User } from './User';
import type { RoleDto } from '../../client';

type Permissions =
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

export class Role extends BaseModel<Role> implements RoleDto {
  tenantId!: string;
  name!: string;
  description!: string;
  global!: boolean;
  draft!: boolean;
  superAdmin!: boolean;
  tenantAdmin!: boolean;
  permissions!: Permissions[];
  users?: User[];

  constructor(params: Partial<Role>) {
    super(params);
  }
}
