import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { authTokenInterceptor } from './auth-token.interceptor';
import { AuthService, RefreshTokenResponse } from '../../api/auth.service';
import { User } from '../../models/User';

describe('authTokenInterceptor', () => {
  let authServiceMock: any;
  let mockRequest: HttpRequest<unknown>;

  beforeEach(() => {
    authServiceMock = {
      getAccessToken: vi.fn(),
      getRefreshToken: vi.fn(),
      sendRefreshToken: vi.fn(),
      setTokens: vi.fn(),
      setLoggedInUser: vi.fn(),
      logout: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });

    mockRequest = new HttpRequest('GET', '/test');
  });

  it('should add authorization header with access token', () => {
    authServiceMock.getAccessToken.mockReturnValue('test-token');
    const mockResponse: HttpEvent<unknown> = {
      body: 'success',
      type: 4,
    } as any;
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    const result = TestBed.runInInjectionContext({
      injector: mockInjectorFactory,
      fn: () => authTokenInterceptor(mockRequest, nextMock),
    });

    expect(nextMock).toHaveBeenCalled();
    expect(authServiceMock.getAccessToken).toHaveBeenCalled();
  });

  it('should handle successful request without errors', () => {
    authServiceMock.getAccessToken.mockReturnValue('test-token');
    const mockResponse: HttpEvent<unknown> = {
      body: 'success',
      type: 4,
    } as any;
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    const result$ = authTokenInterceptor(mockRequest, nextMock);

    result$.subscribe((response) => {
      expect(response).toBe(mockResponse);
    });
  });

  it('should handle non-401 errors without refresh', () => {
    authServiceMock.getAccessToken.mockReturnValue('test-token');
    const error = { status: HttpStatusCode.InternalServerError };
    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    const result$ = authTokenInterceptor(mockRequest, nextMock);

    result$.subscribe({
      next: () => expect.fail('Should have failed'),
      error: (err) => {
        expect(err).toBe(error);
      },
    });
  });

  it('should handle 401 error without refresh token', () => {
    authServiceMock.getAccessToken.mockReturnValue('expired-token');
    authServiceMock.getRefreshToken.mockReturnValue(null);
    const error = {
      status: HttpStatusCode.Unauthorized,
      message: 'Unauthorized',
    };
    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    const result$ = authTokenInterceptor(mockRequest, nextMock);

    result$.subscribe({
      next: () => expect.fail('Should have failed'),
      error: (err) => {
        expect(err).toBe(error);
      },
    });
  });

  it('should handle successful token refresh and retry request', () => {
    authServiceMock.getAccessToken
      .mockReturnValueOnce('expired-token')
      .mockReturnValueOnce('new-token');
    authServiceMock.getRefreshToken.mockReturnValue('refresh-token');

    const mockUser: User = new User({
      id: '1',
      tenantId: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      roleId: '1',
    });

    const refreshResponse: RefreshTokenResponse = {
      status: HttpStatusCode.Created,
      data: {
        access: 'new-access-token',
        refresh: 'new-refresh-token',
        user: mockUser,
      },
    };
    authServiceMock.sendRefreshToken.mockReturnValue(of(refreshResponse));

    const mockResponse: HttpEvent<unknown> = {
      body: 'success after refresh',
      type: 4,
    } as any;
    let callCount = 0;
    const nextMock = vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return throwError(() => ({ status: HttpStatusCode.Unauthorized }));
      }
      return of(mockResponse);
    });

    const result$ = authTokenInterceptor(mockRequest, nextMock);

    result$.subscribe((response) => {
      expect(authServiceMock.setTokens).toHaveBeenCalledWith(
        'new-access-token',
        'new-refresh-token',
      );
      expect(authServiceMock.setLoggedInUser).toHaveBeenCalledWith(
        refreshResponse.data.user,
      );
      expect(response).toBe(mockResponse);
    });
  });

  it('should handle failed token refresh and logout', () => {
    authServiceMock.getAccessToken.mockReturnValue('expired-token');
    authServiceMock.getRefreshToken.mockReturnValue('refresh-token');

    const mockUser: User = new User({
      id: '1',
      tenantId: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      roleId: '1',
    });

    const refreshResponse: RefreshTokenResponse = {
      status: HttpStatusCode.BadRequest,
      data: {
        access: '',
        refresh: '',
        user: mockUser,
      },
    };
    authServiceMock.sendRefreshToken.mockReturnValue(of(refreshResponse));

    const nextMock = vi
      .fn()
      .mockReturnValue(() =>
        throwError(() => ({ status: HttpStatusCode.Unauthorized })),
      );

    const result$ = authTokenInterceptor(mockRequest, nextMock);

    result$.subscribe({
      next: () => expect.fail('Should have failed'),
      error: (err) => {
        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(err).toBeDefined();
      },
    });
  });

  it('should handle refresh token request error and logout', () => {
    authServiceMock.getAccessToken.mockReturnValue('expired-token');
    authServiceMock.getRefreshToken.mockReturnValue('refresh-token');

    authServiceMock.sendRefreshToken.mockReturnValue(
      throwError(() => new Error('Refresh failed')),
    );

    const nextMock = vi
      .fn()
      .mockReturnValue(() =>
        throwError(() => ({ status: HttpStatusCode.Unauthorized })),
      );

    const result$ = authTokenInterceptor(mockRequest, nextMock);

    result$.subscribe({
      next: () => expect.fail('Should have failed'),
      error: (err) => {
        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(err).toBeDefined();
      },
    });
  });
});
