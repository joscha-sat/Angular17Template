import { Routes } from '@angular/router';
import { NavRoutes } from './other/enums/nav-routes';

import { authGuard } from './other/guards/auth.guard';

export const routes: Routes = [
  // standard route
  { path: '', redirectTo: NavRoutes.TENANT, pathMatch: 'full' },

  // protected routes
  {
    path: '',
    canActivate: [authGuard], // authGuard provided at parent level
    children: [
      // || TENANT || ----------------------------------------------- // >>
      {
        path: NavRoutes.TENANT,
        loadComponent: () =>
          import('./views/tenant.view/tenant.view.component').then(
            (m) => m.TenantViewComponent,
          ),
      },
      // || TENANT DASHBOARD || -------------------------------------- // >>
      {
        path: NavRoutes.TENANT + '/' + NavRoutes.DASHBOARD + '/:id',
        loadComponent: () =>
          import(
            './views/tenant-dashboard.view/tenant-dashboard.view.component'
          ).then((m) => m.TenantDashboardViewComponent),
      },
      // || USER || ----------------------------------------------- // >>
      {
        path: NavRoutes.USER,
        loadComponent: () =>
          import('./views/user.view/user.view.component').then(
            (m) => m.UserViewComponent,
          ),
      },
      // || CUSTOMER || ----------------------------------------------- // >>
      {
        path: NavRoutes.CUSTOMERS,
        loadComponent: () =>
          import('./views/customers.view/customers.view.component').then(
            (m) => m.CustomersViewComponent,
          ),
      },
      // || MAP || ----------------------------------------------- // >>
      {
        path: NavRoutes.MAP,
        loadComponent: () =>
          import('./views/map.view/map.view.component').then(
            (m) => m.MapViewComponent,
          ),
      },
      // || SETTINGS || ----------------------------------------------- // >>
      {
        path: NavRoutes.SETTINGS,
        loadComponent: () =>
          import('./views/settings.view/settings.view.component').then(
            (m) => m.SettingsViewComponent,
          ),
        children: [
          {
            path: NavRoutes.GENERAL,
            loadComponent: () =>
              import(
                './views/settings.view/settings-general.view/settings-general.view.component'
              ).then((m) => m.SettingsGeneralViewComponent),
          },
          {
            path: NavRoutes.ROLES,
            loadComponent: () =>
              import(
                './components/settings/settings-tabs/settings-roles/settings-roles.component'
              ).then((m) => m.SettingsRolesComponent),
          },
        ],
      },

      // || TEST TODO: REMOVE FOR PRODUCTION!!! || ----------------------------------------------- // >>
      {
        path: 'test',
        loadComponent: () =>
          import('./views/test-view/test-view.component').then(
            (m) => m.TestViewComponent,
          ),
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
    path: NavRoutes.LOGIN,
    loadComponent: () =>
      import('./views/login.view/login.view.component').then(
        (m) => m.LoginViewComponent,
      ),
  },

  // || WILDCARD || ----------------------------------------------- // >>
  { path: '**', redirectTo: NavRoutes.ERROR, pathMatch: 'full' },
];
