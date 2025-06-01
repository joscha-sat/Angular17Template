import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ROUTES } from '../enums/ROUTES';
import { AuthService } from '../../api/auth.service';

export const globalUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getLoggedInUser();

  if (user?.role?.global) {
    return true;
  }

  return router.navigateByUrl(`${ROUTES.ERROR}`);
};
