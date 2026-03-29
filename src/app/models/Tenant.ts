import { BaseModel } from './BaseModel';
import { User } from './User';
import { TenantDto } from '../../client';

export class Tenant extends BaseModel<Tenant> implements TenantDto {
  name!: string;

  constructor(params: Partial<User>) {
    super(params);
  }
}
