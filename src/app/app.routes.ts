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

export const routes: Routes = [
  // standard route
  { path: '', redirectTo: NavRoutes.TENANT, pathMatch: 'full' },

  // || TENANT || ----------------------------------------------- // >>
  {
    path: NavRoutes.TENANT,
    component: TenantViewComponent,
    canActivate: [authGuard],
  },
  {
    path: NavRoutes.TENANT + '/' + NavRoutes.DASHBOARD + '/:id',
    component: TenantDashboardViewComponent,
    canActivate: [authGuard],
  },

  // || LOGIN || ----------------------------------------------- // >>
  { path: NavRoutes.LOGIN, component: LoginViewComponent },

  // || USER || ----------------------------------------------- // >>
  {
    path: NavRoutes.USER,
    component: UserViewComponent,
    canActivate: [authGuard],
  },

  // || CUSTOMER || ----------------------------------------------- // >>
  {
    path: NavRoutes.CUSTOMERS,
    component: CustomersViewComponent,
    canActivate: [authGuard],
  },

  // || MAP || ----------------------------------------------- // >>
  {
    path: NavRoutes.MAP,
    component: MapViewComponent,
    canActivate: [authGuard],
  },

  // || SETTINGS || ----------------------------------------------- // >>
  {
    path: NavRoutes.SETTINGS,
    component: SettingsViewComponent,
    canActivate: [authGuard],
  },

  // || TEST || ----------------------------------------------- // >>
  {
    path: 'test',
    component: TestViewComponent,
  },
];
