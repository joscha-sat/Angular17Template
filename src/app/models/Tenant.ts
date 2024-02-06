import { BaseModel } from "./BaseModel";
import { User } from "./User";

export class Tenant extends BaseModel<Tenant> {
  name!: string;
  user?: User[];

  constructor(params: Partial<User>) {
    super(params);
    this.createdAt = new Date(this.createdAt);
    this.updatedAt = new Date(this.updatedAt);
  }
}
