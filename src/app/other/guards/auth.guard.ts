import { type CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { environment } from '../environments/environment';
import { ROUTES } from '../enums/ROUTES';
import { AuthService } from '../../api/auth.service';

/**
 * Auth Guard:
 * Protects routes from access by unauthenticated users.
 * navigates to login page if user is not logged in.
 */
export const authGuard: CanActivateFn = () => {
  // Mock mode does not require authentication
  if (environment.mock) {
    return true;
  }

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLoggedIn: boolean = authService.isLoggedIn();

  if (!isLoggedIn) {
    // navigation to login page
    return router.parseUrl(ROUTES.LOGIN);
  }

  return isLoggedIn;
};
