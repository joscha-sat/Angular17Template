import { BaseModel } from './BaseModel';
import { User } from './User';

export class Role extends BaseModel<Role> {
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
