import { BaseModel } from './BaseModel';

export class Customer extends BaseModel<Customer> {
  name?: string;

  constructor(params: Partial<Customer>) {
    super(params);
  }
}
