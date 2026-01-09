import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../../api/auth.service';
import { ROUTES } from '../enums/ROUTES';

describe('authGuard', () => {
  let authServiceMock: any;
  let routerMock: any;
  const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
  const mockRouterStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(() => {
    authServiceMock = {
      isLoggedIn: vi.fn(),
    };

    routerMock = {
      parseUrl: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should allow access when user is logged in', () => {
    authServiceMock.isLoggedIn.mockReturnValue(true);

    const result = authGuard(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot,
    );

    expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
    expect(routerMock.parseUrl).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should redirect to login when user is not logged in', () => {
    authServiceMock.isLoggedIn.mockReturnValue(false);
    const mockUrlTree = { url: '/login' };
    routerMock.parseUrl.mockReturnValue(mockUrlTree);

    const result = authGuard(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot,
    );

    expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
    expect(routerMock.parseUrl).toHaveBeenCalledWith(ROUTES.LOGIN);
    expect(result).toBe(mockUrlTree);
  });

  it('should return boolean when logged in', () => {
    authServiceMock.isLoggedIn.mockReturnValue(true);

    const result = authGuard(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot,
    );

    expect(typeof result).toBe('boolean');
    expect(result).toBe(true);
  });

  it('should return UrlTree when not logged in', () => {
    authServiceMock.isLoggedIn.mockReturnValue(false);
    const mockUrlTree = { url: '/login' };
    routerMock.parseUrl.mockReturnValue(mockUrlTree);

    const result = authGuard(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot,
    );

    expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
    expect(routerMock.parseUrl).toHaveBeenCalledWith(ROUTES.LOGIN);
    expect(result).toBe(mockUrlTree);
  });
});
