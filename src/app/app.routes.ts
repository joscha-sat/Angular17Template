import { Routes } from '@angular/router';
import { ROUTES } from './other/enums/ROUTES';

import { authGuard } from './other/guards/auth.guard';

export const routes: Routes = [
  // standard route
  { path: '', redirectTo: ROUTES.TENANT, pathMatch: 'full' },

  // protected routes
  {
    path: '',
    canActivate: [authGuard], // authGuard provided at parent level
    children: [
      // || TENANT || ----------------------------------------------- // >>
      {
        path: ROUTES.TENANT,
        loadComponent: () =>
          import('./views/tenant.view/tenant.view.component').then((m) => m.TenantViewComponent),
      },
      // || USER || ----------------------------------------------- // >>
      {
        path: ROUTES.USER,
        loadComponent: () =>
          import('./views/user.view/user.view.component').then((m) => m.UserViewComponent),
      },
      // || SETTINGS || ----------------------------------------------- // >>
      {
        path: ROUTES.SETTINGS,
        loadComponent: () =>
          import('./views/settings.view/settings.view.component').then(
            (m) => m.SettingsViewComponent,
          ),
        children: [
          {
            path: ROUTES.GENERAL,
            loadComponent: () =>
              import('./views/settings.view/settings-general.view/settings-general.view.component').then(
                (m) => m.SettingsGeneralViewComponent,
              ),
          },
          {
            path: ROUTES.ROLES,
            loadComponent: () =>
              import('./components/settings/settings-tabs/settings-roles/settings-roles.component').then(
                (m) => m.SettingsRolesComponent,
              ),
          },
        ],
      },

      // || TEST TODO: REMOVE FOR PRODUCTION!!! || ----------------------------------------------- // >>
      {
        path: 'test',
        loadComponent: () =>
          import('./views/test-view/test-view.component').then((m) => m.TestViewComponent),
        children: [
          {
            path: 'settings',
            loadComponent: () =>
              import('./views/settings.view/settings.view.component').then(
                (m) => m.SettingsViewComponent,
              ),
          },

          {
            path: 'tenant',
            loadComponent: () =>
              import('./views/tenant.view/tenant.view.component').then(
                (m) => m.TenantViewComponent,
              ),
          },
        ],
      },
    ],
  },

  // || LOGIN || ----------------------------------------------- // >>
  {
    path: ROUTES.LOGIN,
    loadComponent: () =>
      import('./views/login.view/login.view.component').then((m) => m.LoginViewComponent),
  },

  // || WILDCARD || ----------------------------------------------- // >>
  { path: '**', redirectTo: ROUTES.ERROR, pathMatch: 'full' },
];
