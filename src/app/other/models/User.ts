import { BaseModel } from "./BaseModel";
import { Tenant } from "./Tenant";
import { Role } from "./Role";


export class User extends BaseModel<User> {
  tenantId!: string;
  password!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  phone!: string;
  roleId!: string;
  active!: boolean;
  inviteAcceptedAt!: string;
  tenant?: Tenant;
  role?: Role;

  constructor(params: Partial<User>) {
    super(params);
  }

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
