import { BaseModel } from './BaseModel';
import type { User } from './User';
import type { RoleDto } from '../../client';

export type RolePermission = RoleDto['permissions'][number];

export class Role extends BaseModel<Role> implements RoleDto {
  tenantId!: string;
  name!: string;
  description!: string;
  global!: boolean;
  draft!: boolean;
  superAdmin!: boolean;
  tenantAdmin!: boolean;
  permissions!: RolePermission[];
  users?: User[];

  constructor(params: Partial<Role>) {
    super(params);
  }
}
