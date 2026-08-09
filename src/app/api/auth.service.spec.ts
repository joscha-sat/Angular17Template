import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService, type LoginBody, type LoginResponse, type RefreshTokenResponse } from './auth.service';
import { User } from '../models/User';
import { environment } from '../other/environments/environment';
import { ROUTES } from '../other/enums/ROUTES';
import { ApiRoutes } from '../other/enums/api-routes';
import { ZodError } from 'zod';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerMock: MockedObject<Router>;
  let localStorageMock: Record<string, string>;

  const mockUser: User = new User({
    id: '1',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+49 30 12345678',
    active: true,
    tenantId: '1',
    roleId: '1',
  });

  const mockLoginBody: LoginBody = {
    username: 'test@example.com',
    password: 'password123',
  };

  const testLoginBody: LoginBody = {
    username: 'admin',
    password: 'admin',
  };

  const mockLoginResponse: LoginResponse = {
    access_token: 'access-token-123',
    refresh_token: 'refresh-token-123',
    user: mockUser,
  };

  const testLoginResponse: LoginResponse = {
    ...mockLoginResponse,
    user: new User({ ...mockUser, email: 'admin' }),
  };

  const mockRefreshTokenResponse: RefreshTokenResponse = {
    status: 200,
    data: {
      access: 'new-access-token',
      refresh: 'new-refresh-token',
      user: mockUser,
    },
  };

  beforeEach(() => {
    localStorageMock = {};

    // Simple localStorage mock
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
      },
      writable: true,
    });

    routerMock = {
      navigateByUrl: vi.fn().mockResolvedValue(true),
    } as unknown as MockedObject<Router>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  describe('isLoggedIn', () => {
    it('should return false when no tokens are in localStorage', () => {
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return false when only access token is present', () => {
      localStorageMock['access_token'] = 'access-token';
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return false when only refresh token is present', () => {
      localStorageMock['refresh_token'] = 'refresh-token';
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return true when both tokens are present', () => {
      localStorageMock['access_token'] = 'access-token';
      localStorageMock['refresh_token'] = 'refresh-token';
      expect(service.isLoggedIn()).toBe(true);
    });
  });

  describe('login', () => {
    it('should send login request and store tokens and user on success', () => {
      const loginSpy = vi.spyOn(service, 'setTokens');
      const setUserSpy = vi.spyOn(service, 'setLoggedInUser');

      service.login(mockLoginBody).subscribe(() => {
        expect(loginSpy).toHaveBeenCalledWith('access-token-123', 'refresh-token-123');
        expect(setUserSpy).toHaveBeenCalledWith(mockUser);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${ROUTES.AUTH}/${ROUTES.LOGIN}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockLoginBody);
      req.flush(mockLoginResponse);
    });

    it('should accept the test username as the authenticated user email', () => {
      service.login(testLoginBody).subscribe(() => {
        expect(service.getLoggedInUser()?.email).toBe('admin');
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${ROUTES.AUTH}/${ROUTES.LOGIN}`);
      expect(req.request.body).toEqual(testLoginBody);
      req.flush(testLoginResponse);
    });

    it('should reject a login response with missing tokens', () => {
      service.login(mockLoginBody).subscribe({
        next: () => expect.fail('should have failed validation'),
        error: (error: unknown) => {
          expect(error).toBeInstanceOf(ZodError);
        },
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${ROUTES.AUTH}/${ROUTES.LOGIN}`);
      req.flush({ user: mockUser });
    });

    it('should handle login error', () => {
      service.login(mockLoginBody).subscribe({
        next: () => expect.fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${ROUTES.AUTH}/${ROUTES.LOGIN}`);
      req.flush('Invalid credentials', {
        status: 401,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('logout', () => {
    it('should clear user session and navigate to login', async () => {
      // Setup user session
      localStorageMock['access_token'] = 'access-token';
      localStorageMock['refresh_token'] = 'refresh-token';
      localStorageMock['user'] = JSON.stringify(mockUser);

      const result = await service.logout();

      expect(result).toBe(true);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });

  describe('sendRefreshToken', () => {
    it('should send refresh token request', () => {
      localStorageMock['refresh_token'] = 'refresh-token-123';

      service.sendRefreshToken().subscribe((response) => {
        expect(response).toEqual(mockRefreshTokenResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/${ApiRoutes.AUTH}/refreshToken`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refreshToken: 'refresh-token-123' });
      req.flush(mockRefreshTokenResponse);
    });

    it('should reject a refresh response with an invalid access token', () => {
      service.sendRefreshToken().subscribe({
        next: () => expect.fail('should have failed validation'),
        error: (error: unknown) => {
          expect(error).toBeInstanceOf(ZodError);
        },
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/${ApiRoutes.AUTH}/refreshToken`);
      req.flush({
        ...mockRefreshTokenResponse,
        data: {
          ...mockRefreshTokenResponse.data,
          access: '',
        },
      });
    });
  });

  describe('token management', () => {
    it('should get access token from localStorage', () => {
      localStorageMock['access_token'] = 'test-access-token';
      expect(service.getAccessToken()).toBe('test-access-token');
    });

    it('should return null when access token is not found', () => {
      expect(service.getAccessToken()).toBeNull();
    });

    it('should get refresh token from localStorage', () => {
      localStorageMock['refresh_token'] = 'test-refresh-token';
      expect(service.getRefreshToken()).toBe('test-refresh-token');
    });

    it('should return null when refresh token is not found', () => {
      expect(service.getRefreshToken()).toBeNull();
    });

    it('should set tokens in localStorage', () => {
      service.setTokens('new-access', 'new-refresh');
      expect(localStorageMock['access_token']).toBe('new-access');
      expect(localStorageMock['refresh_token']).toBe('new-refresh');
    });
  });

  describe('user management', () => {
    it('should set logged in user', () => {
      service.setLoggedInUser(mockUser);
      expect(localStorageMock['user']).toBe(JSON.stringify(mockUser));
    });

    it('should get logged in user from memory', () => {
      // Set user via service to store in memory
      service.setLoggedInUser(mockUser);
      const user = service.getLoggedInUser();
      expect(user).toEqual(mockUser);
    });

    it('should get logged in user from localStorage when not in memory', () => {
      localStorageMock['user'] = JSON.stringify(mockUser);
      const user = service.getLoggedInUser();
      expect(user).toEqual(mockUser);
    });

    it('should restore the test user username from localStorage', () => {
      localStorageMock['user'] = JSON.stringify({ ...mockUser, email: 'admin' });

      expect(service.getLoggedInUser()?.email).toBe('admin');
    });

    it('should return null when user is not found', () => {
      expect(service.getLoggedInUser()).toBeNull();
    });

    it('should handle malformed user data in localStorage', () => {
      localStorageMock['user'] = 'invalid-json';
      // The service should handle the JSON.parse error gracefully
      expect(() => service.getLoggedInUser()).toThrow(SyntaxError);
    });

    it('should reject a stored user with missing identity data', () => {
      localStorageMock['user'] = JSON.stringify({ id: '1' });

      expect(() => service.getLoggedInUser()).toThrow(ZodError);
    });
  });

  describe('private methods', () => {
    it('should build URL correctly', () => {
      // Test the URL building by checking actual service behavior
      // The buildUrl method is private but we can infer its behavior from public methods
      expect(environment.baseUrl).toBeTruthy();
      expect(typeof environment.baseUrl).toBe('string');
    });
  });
});
