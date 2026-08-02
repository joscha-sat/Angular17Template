import { type CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ROUTES } from '../enums/ROUTES';
import { AuthService } from '../../api/auth.service';
import type { User } from '../../models/User';

export const globalUserGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user: User | null = authService.getLoggedInUser();

  if (user?.role?.global) {
    return true;
  }

  return router.navigateByUrl(`${ROUTES.ERROR}`);
};
