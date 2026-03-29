import { BaseModel } from './BaseModel';
import { Customer as GenCustomer } from '../../client';

export class Customer extends BaseModel<Customer> implements GenCustomer {
  name!: string;
  declare createdAt: string;
  declare updatedAt: string;

  constructor(params: Partial<Customer>) {
    super(params);
  }
}
