import { Routes } from "@angular/router";
import { NavRoutes } from "./enums/nav-routes";
import { LoginViewComponent } from "./views/login.view/login.view.component";

export const routes: Routes = [
  // standard route
  { path: "", redirectTo: NavRoutes.LOGIN, pathMatch: "full" },
  
  { path: NavRoutes.LOGIN, component: LoginViewComponent },
];
