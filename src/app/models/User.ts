import { BaseModel } from './BaseModel';
import { Tenant } from './Tenant';
import { Role } from './Role';

export class User extends BaseModel<User> {
  // Additional properties not in UserData interface
  tenant?: Tenant;
  role?: Role;
  tenantId!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  roleId!: string;
  password?: string | undefined;
  phone?: string | undefined;
  active?: boolean | undefined;
  inviteAcceptedAt?: string | undefined;

  constructor(params: Partial<User>) {
    super(params);
  }

  get fullName(): string {
    const first = this.firstName?.trim() || '';
    const last = this.lastName?.trim() || '';
    return [first, last].filter(Boolean).join(' ') || 'no name';
  }

  get initials(): string {
    const first = this.firstName?.charAt(0)?.toUpperCase() || '';
    const last = this.lastName?.charAt(0)?.toUpperCase() || '';
    return first + last;
  }

  get roleName(): string {
    return this.role?.name || 'no role';
  }

  get hasAcceptedInvite(): boolean {
    return !!this.inviteAcceptedAt;
  }
}
