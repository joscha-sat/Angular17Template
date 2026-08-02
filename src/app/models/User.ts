import { BaseModel } from './BaseModel';
import type { Tenant } from './Tenant';
import type { Role } from './Role';
import type { UserDto } from '../../client';

export class User extends BaseModel<User> implements UserDto {
  private static readonly DEFAULT_DISPLAY_NAME: string = 'no name';
  private static readonly DEFAULT_ROLE_NAME: string = 'no role';

  tenant?: Tenant;
  role?: Role;
  tenantId!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  roleId!: string;
  password!: string;
  phone!: string;
  active!: boolean;
  inviteAcceptedAt?: string;

  constructor(params: Partial<User>) {
    super(params);
  }

  get fullName(): string {
    const first: string = this.firstName.trim() || '';
    const last: string = this.lastName.trim() || '';
    return [first, last].filter(Boolean).join(' ') || User.DEFAULT_DISPLAY_NAME;
  }

  get initials(): string {
    const first: string = this.firstName.charAt(0).toUpperCase() || '';
    const last: string = this.lastName.charAt(0).toUpperCase() || '';
    return first + last;
  }

  get roleName(): string {
    return this.role && this.role.name
      ? this.role.name
      : User.DEFAULT_ROLE_NAME;
  }

  get hasInviteAccepted(): boolean {
    return !!this.inviteAcceptedAt;
  }
}
