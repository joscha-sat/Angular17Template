import { Routes } from "@angular/router";
import { NavRoutes } from "./enums/nav-routes";
import { LoginViewComponent } from "./views/login.view/login.view.component";
import { SettingsViewComponent } from "./views/settings.view/settings.view.component";
import { TenantViewComponent } from "./views/tenant.view/tenant.view.component";

export const routes: Routes = [
  // standard route
  { path: "", redirectTo: NavRoutes.TENANT, pathMatch: "full" },

  // || TENANT || ----------------------------------------------- // >>
  { path: NavRoutes.TENANT, component: TenantViewComponent },

  // || LOGIN || ----------------------------------------------- // >>
  { path: NavRoutes.LOGIN, component: LoginViewComponent },

  // || SETTINGS || ----------------------------------------------- // >>
  { path: NavRoutes.SETTINGS, component: SettingsViewComponent },
];
