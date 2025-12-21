import { BaseModel } from './BaseModel';
import { Tenant } from './Tenant';
import { Role } from './Role';

export class User extends BaseModel<User> {
  private static readonly DEFAULT_DISPLAY_NAME = 'no name';
  private static readonly DEFAULT_ROLE_NAME = 'no role';

  tenant?: Tenant;
  role?: Role;
  tenantId!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  roleId!: string;
  password?: string;
  phone?: string;
  active?: boolean;
  inviteAcceptedAt?: string;

  constructor(params: Partial<User>) {
    super(params);
  }

  get fullName(): string {
    const first = this.firstName.trim() || '';
    const last = this.lastName.trim() || '';
    return [first, last].filter(Boolean).join(' ') || User.DEFAULT_DISPLAY_NAME;
  }

  get initials(): string {
    const first = this.firstName.charAt(0).toUpperCase() || '';
    const last = this.lastName.charAt(0).toUpperCase() || '';
    return first + last;
  }

  get roleName(): string {
    return this.role && this.role.name
      ? this.role.name
      : User.DEFAULT_ROLE_NAME;
  }

  get hasAcceptedInvite(): boolean {
    return !!this.inviteAcceptedAt;
  }
}
