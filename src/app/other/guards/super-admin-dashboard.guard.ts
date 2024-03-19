import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { NavRoutes } from "../enums/nav-routes";
import { AuthService } from "../../api/auth.service";
import { SuperAdminService } from "../../api/super-admin.service";


/**
 * Super Admin Guard:
 * Protects routes from access by non-super-admin users.
 * navigates to user page if user is not super admin.
 */
export const superAdminDashboardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const superAdminService = inject(SuperAdminService);
  const router = inject(Router);
  const isSuperAdmin = superAdminService.isSuperAdmin();

  if (!isSuperAdmin) {
    // navigation to
    const tenantId = authService.getLoggedInUser()?.tenantId;
    if (tenantId != null) {
      return router.navigateByUrl(
        `${ NavRoutes.TENANT }/${ tenantId }/${ NavRoutes.DASHBOARD }`,
      );
    }
    return router.navigateByUrl(NavRoutes.USER);
  }

  return isSuperAdmin;
};
