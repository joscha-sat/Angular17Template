import { BaseModel } from "./BaseModel";
import { User } from "./User";

export class Tenant extends BaseModel<Tenant> {
  name!: string;
  user?: User[];

  constructor(params: Partial<User>) {
    super(params);
  }
}
