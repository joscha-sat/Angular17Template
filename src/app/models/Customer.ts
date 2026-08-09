import { BaseModel } from './BaseModel';
import type { Customer as GenCustomer } from '../../client';

export class Customer extends BaseModel<Customer> implements GenCustomer {
  name!: string;
  declare createdAt: string;
  declare updatedAt: string;

  constructor(parameters: Partial<Customer>) {
    super(parameters);
  }
}
