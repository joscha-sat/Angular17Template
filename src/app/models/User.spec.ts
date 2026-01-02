import { User } from './User';
import { Role } from './Role';
import { Tenant } from './Tenant';

describe('User', () => {
  let user: User;
  let mockTenant: Tenant;
  let mockRole: Role;

  beforeEach(() => {
    mockTenant = {
      id: 'tenant1',
      name: 'Test Tenant',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Tenant;

    mockRole = {
      id: 'role1',
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Role;

    user = new User({
      id: 'user1',
      tenant: mockTenant,
      role: mockRole,
      tenantId: 'tenant1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      roleId: 'role1',
      phone: '+1234567890',
      active: true,
      inviteAcceptedAt: '2023-01-01',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  describe('constructor', () => {
    it('should create user with provided data', () => {
      expect(user.id).toBe('user1');
      expect(user.email).toBe('test@example.com');
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
    });

    it('should create user with partial data', () => {
      const partialUser = new User({
        email: 'partial@example.com',
      });
      expect(partialUser.email).toBe('partial@example.com');
    });

    it('should handle optional fields', () => {
      const userWithOptionals = new User({
        email: 'optional@example.com',
        password: 'secret123',
        phone: '+9876543210',
        active: false,
      });
      expect(userWithOptionals.password).toBe('secret123');
      expect(userWithOptionals.phone).toBe('+9876543210');
      expect(userWithOptionals.active).toBe(false);
    });
  });

  describe('fullName getter', () => {
    it('should return full name when both first and last name are provided', () => {
      expect(user.fullName).toBe('John Doe');
    });

    it('should return first name when last name is empty', () => {
      user.lastName = '';
      expect(user.fullName).toBe('John');
    });

    it('should return last name when first name is empty', () => {
      user.firstName = '';
      expect(user.fullName).toBe('Doe');
    });

    it('should return first name when last name is whitespace', () => {
      user.lastName = '   ';
      expect(user.fullName).toBe('John');
    });

    it('should return last name when first name is whitespace', () => {
      user.firstName = '   ';
      expect(user.fullName).toBe('Doe');
    });

    it('should return default display name when both names are empty', () => {
      user.firstName = '';
      user.lastName = '';
      expect(user.fullName).toBe('no name');
    });

    it('should handle names with extra spaces', () => {
      user.firstName = '  John  ';
      user.lastName = '  Doe  ';
      expect(user.fullName).toBe('John Doe');
    });
  });

  describe('initials getter', () => {
    it('should return correct initials for normal name', () => {
      expect(user.initials).toBe('JD');
    });

    it('should return first initial when last name is empty', () => {
      user.lastName = '';
      expect(user.initials).toBe('J');
    });

    it('should return last initial when first name is empty', () => {
      user.firstName = '';
      expect(user.initials).toBe('D');
    });

    it('should return empty string when both names are empty', () => {
      user.firstName = '';
      user.lastName = '';
      expect(user.initials).toBe('');
    });

    it('should return uppercase initials regardless of input case', () => {
      user.firstName = 'john';
      user.lastName = 'doe';
      expect(user.initials).toBe('JD');
    });

    it('should handle single character names', () => {
      user.firstName = 'a';
      user.lastName = 'b';
      expect(user.initials).toBe('AB');
    });
  });

  describe('roleName getter', () => {
    it('should return role name when role exists', () => {
      expect(user.roleName).toBe('Admin');
    });

    it('should return default role name when role is undefined', () => {
      user.role = undefined;
      expect(user.roleName).toBe('no role');
    });

    it('should return default role name when role.name is empty', () => {
      user.role = { id: 'role1', name: '' } as Role;
      expect(user.roleName).toBe('no role');
    });

    it('should return default role name when role is null', () => {
      user.role = null as any;
      expect(user.roleName).toBe('no role');
    });
  });

  describe('hasAcceptedInvite getter', () => {
    it('should return true when inviteAcceptedAt is set', () => {
      expect(user.hasAcceptedInvite).toBe(true);
    });

    it('should return false when inviteAcceptedAt is empty string', () => {
      user.inviteAcceptedAt = '';
      expect(user.hasAcceptedInvite).toBe(false);
    });

    it('should return false when inviteAcceptedAt is undefined', () => {
      user.inviteAcceptedAt = undefined;
      expect(user.hasAcceptedInvite).toBe(false);
    });

    it('should return false when inviteAcceptedAt is null', () => {
      user.inviteAcceptedAt = null as any;
      expect(user.hasAcceptedInvite).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty first name with non-empty last name for fullName', () => {
      user.firstName = '';
      user.lastName = 'Smith';
      expect(user.fullName).toBe('Smith');
    });

    it('should handle non-empty first name with empty last name for fullName', () => {
      user.firstName = 'Jane';
      user.lastName = '';
      expect(user.fullName).toBe('Jane');
    });

    it('should handle whitespace-only names for fullName', () => {
      user.firstName = '   ';
      user.lastName = '   ';
      expect(user.fullName).toBe('no name');
    });

    it('should handle character extraction for single character names in initials', () => {
      user.firstName = 'J';
      user.lastName = '';
      expect(user.initials).toBe('J');
    });
  });
});
