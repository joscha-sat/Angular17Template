import { Routes } from '@angular/router';
import { NavRoutes } from './other/enums/nav-routes';
import { LoginViewComponent } from './views/login.view/login.view.component';
import { SettingsViewComponent } from './views/settings.view/settings.view.component';
import { TenantViewComponent } from './views/tenant.view/tenant.view.component';
import { UserViewComponent } from './views/user.view/user.view.component';
import { TenantDashboardViewComponent } from './views/tenant-dashboard.view/tenant-dashboard.view.component';
import { CustomersViewComponent } from './views/customers.view/customers.view.component';
import { authGuard } from './other/guards/auth.guard';
import { MapViewComponent } from './views/map.view/map.view.component';
import { TestViewComponent } from './views/test-view/test-view.component';
import { SettingsGeneralViewComponent } from './views/settings.view/settings-general.view/settings-general.view.component';
import { SettingsRolesComponent } from './components/settings/settings-tabs/settings-roles/settings-roles.component';

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
        component: TenantViewComponent,
      },
      // || TENANT DASHBOARD || -------------------------------------- // >>
      {
        path: NavRoutes.TENANT + '/' + NavRoutes.DASHBOARD + '/:id',
        component: TenantDashboardViewComponent,
      },
      // || USER || ----------------------------------------------- // >>
      {
        path: NavRoutes.USER,
        component: UserViewComponent,
      },
      // || CUSTOMER || ----------------------------------------------- // >>
      {
        path: NavRoutes.CUSTOMERS,
        component: CustomersViewComponent,
      },
      // || MAP || ----------------------------------------------- // >>
      {
        path: NavRoutes.MAP,
        component: MapViewComponent,
      },
      // || SETTINGS || ----------------------------------------------- // >>
      {
        path: NavRoutes.SETTINGS,
        component: SettingsViewComponent,
        children: [
          {
            path: NavRoutes.GENERAL,
            component: SettingsGeneralViewComponent,
          },
          {
            path: NavRoutes.ROLES,
            component: SettingsRolesComponent,
          },
        ],
      },

      // || TEST TODO: REMOVE FOR PRODUCTION!!! || ----------------------------------------------- // >>
      {
        path: 'test',
        component: TestViewComponent,
        children: [
          {
            path: 'settings',
            component: SettingsViewComponent,
          },

          {
            path: 'tenant',
            component: TenantViewComponent,
          },
        ],
      },
    ],
  },

  // || LOGIN || ----------------------------------------------- // >>
  { path: NavRoutes.LOGIN, component: LoginViewComponent },

  // || WILDCARD || ----------------------------------------------- // >>
  { path: '**', redirectTo: NavRoutes.ERROR, pathMatch: 'full' },
];
