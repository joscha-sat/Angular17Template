import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../api/auth.service';

/**
 * Login Guard:
 * Protects the login page from access by authenticated users.
 * navigates to home page if user is logged in.
 */
export const loginPageAccessGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLoggedIn: boolean = authService.isLoggedIn();

  if (isLoggedIn) {
    // navigation to login page
    return router.parseUrl('/');
  }

  return !isLoggedIn;
};
