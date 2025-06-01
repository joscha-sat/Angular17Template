import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ROUTES } from '../enums/ROUTES';
import { AuthService } from '../../api/auth.service';

/**
 * Auth Guard:
 * Protects routes from access by unauthenticated users.
 * navigates to login page if user is not logged in.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    // navigation to login page
    return router.parseUrl(ROUTES.LOGIN);
  }

  return isLoggedIn;
};
