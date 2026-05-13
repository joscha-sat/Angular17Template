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
        loadComponent: () => import('./views/tenant.view/tenant.view').then((m) => m.TenantView),
      },
      // || USER || ----------------------------------------------- // >>
      {
        path: ROUTES.USER,
        loadComponent: () => import('./views/user.view/user.view').then((m) => m.UserView),
      },
      // || SETTINGS || ----------------------------------------------- // >>
      {
        path: ROUTES.SETTINGS,
        loadComponent: () =>
          import('./views/settings.view/settings.view').then((m) => m.SettingsView),
        children: [
          {
            path: ROUTES.GENERAL,
            loadComponent: () =>
              import('./views/settings.view/settings-general.view/settings-general.view').then(
                (m) => m.SettingsGeneralView,
              ),
          },
          {
            path: ROUTES.ROLES,
            loadComponent: () =>
              import('./components/settings/settings-tabs/settings-roles/settings-roles').then(
                (m) => m.SettingsRoles,
              ),
          },
        ],
      },

      // || TEST TODO: REMOVE FOR PRODUCTION!!! || ----------------------------------------------- // >>
      {
        path: 'test',
        loadComponent: () => import('./views/test-view/test-view').then((m) => m.TestView),
        children: [
          {
            path: 'settings',
            loadComponent: () =>
              import('./views/settings.view/settings.view').then((m) => m.SettingsView),
          },

          {
            path: 'tenant',
            loadComponent: () =>
              import('./views/tenant.view/tenant.view').then((m) => m.TenantView),
          },
        ],
      },
    ],
  },

  // || LOGIN || ----------------------------------------------- // >>
  {
    path: ROUTES.LOGIN,
    loadComponent: () => import('./views/login.view/login.view').then((m) => m.LoginView),
  },

  // || WILDCARD || ----------------------------------------------- // >>
  { path: '**', redirectTo: ROUTES.ERROR, pathMatch: 'full' },
];
