import { BaseModel } from './BaseModel';
import type { TenantDto } from '../../client';

export class Tenant extends BaseModel<Tenant> implements TenantDto {
  name!: string;

  constructor(parameters: Partial<Tenant>) {
    super(parameters);
  }
}
