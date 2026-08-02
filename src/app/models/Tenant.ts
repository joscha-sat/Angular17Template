import { BaseModel } from './BaseModel';
import type { TenantDto } from '../../client';

export class Tenant extends BaseModel<Tenant> implements TenantDto {
  name!: string;

  constructor(params: Partial<Tenant>) {
    super(params);
  }
}
