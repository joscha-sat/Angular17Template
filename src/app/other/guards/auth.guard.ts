import { type CanActivateFn, Router, type UrlTree } from '@angular/router';
import { inject } from '@angular/core';

import { environment } from '../environments/environment';
import { ROUTES } from '../enums/ROUTES';
import { AuthService } from '../../api/auth.service';

/**
 * Auth Guard:
 * Protects routes from access by unauthenticated users.
 * navigates to login page if user is not logged in.
 */
export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLoggedIn: boolean = authService.isLoggedIn();

  let navigationResult: boolean | UrlTree;

  if (environment.mock) {
    navigationResult = true;
  } else if (isLoggedIn) {
    navigationResult = isLoggedIn;
  } else {
    navigationResult = router.parseUrl(ROUTES.LOGIN);
  }

  return navigationResult;
};
