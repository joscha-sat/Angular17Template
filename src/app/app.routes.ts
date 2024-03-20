import { Routes } from '@angular/router';
import { NavRoutes } from './other/enums/nav-routes';
import { LoginViewComponent } from './views/login.view/login.view.component';
import { SettingsViewComponent } from './views/settings.view/settings.view.component';
import { TenantViewComponent } from './views/tenant.view/tenant.view.component';
import { UserViewComponent } from './views/user.view/user.view.component';
import { TenantDashboardViewComponent } from './views/tenant-dashboard.view/tenant-dashboard.view.component';
import { CustomersViewComponent } from './views/customers.view/customers.view.component';

export const routes: Routes = [
  // standard route
  { path: '', redirectTo: NavRoutes.TENANT, pathMatch: 'full' },

  // || TENANT || ----------------------------------------------- // >>
  { path: NavRoutes.TENANT, component: TenantViewComponent },
  {
    path: NavRoutes.TENANT + '/' + NavRoutes.DASHBOARD + '/:id',
    component: TenantDashboardViewComponent,
  },

  // || LOGIN || ----------------------------------------------- // >>
  { path: NavRoutes.LOGIN, component: LoginViewComponent },

  // || USER || ----------------------------------------------- // >>
  { path: NavRoutes.USER, component: UserViewComponent },

  // || CUSTOMER || ----------------------------------------------- // >>
  { path: NavRoutes.CUSTOMERS, component: CustomersViewComponent },

  // || SETTINGS || ----------------------------------------------- // >>
  { path: NavRoutes.SETTINGS, component: SettingsViewComponent },
];
