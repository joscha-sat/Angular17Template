import { BaseModel } from "./BaseModel";


export class Customer extends BaseModel<Customer> {
  firstName?: string;
  lastName?: string;

  constructor(params: Partial<Customer>) {
    super(params);
  }

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
