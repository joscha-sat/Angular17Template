import { BaseModel } from "./BaseModel";


export class Customer extends BaseModel<Customer> {
  firstName?: string;
  lastName?: string;

  constructor(params: Partial<Customer>) {
    super(params);
    this.createdAt = new Date(this.createdAt);
    this.updatedAt = new Date(this.updatedAt);
  }

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
