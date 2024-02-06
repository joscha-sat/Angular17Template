import { Routes } from "@angular/router";
import { NavRoutes } from "./enums/nav-routes";
import { LoginViewComponent } from "./views/login.view/login.view.component";
import { SettingsViewComponent } from "./views/settings.view/settings.view.component";

export const routes: Routes = [
  // standard route
  { path: "", redirectTo: NavRoutes.LOGIN, pathMatch: "full" },


  // || LOGIN || ----------------------------------------------- // >>
  { path: NavRoutes.LOGIN, component: LoginViewComponent },

  // || SETTINGS || ----------------------------------------------- // >>
  { path: NavRoutes.SETTINGS, component: SettingsViewComponent },
];
