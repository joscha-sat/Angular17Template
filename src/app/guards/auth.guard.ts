import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { NavRoutes } from "../enums/nav-routes";
import { AuthService } from "../api/auth.service";

/**
 * Auth Guard:
 * Protects routes from access by unauthenticated users.
 * navigates to login page if user is not logged in.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    // navigation to login page
    return router.parseUrl(NavRoutes.LOGIN);
  }

  return isLoggedIn;
};
