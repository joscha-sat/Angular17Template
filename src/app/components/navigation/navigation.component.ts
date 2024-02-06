import { Component, OnInit } from "@angular/core";
import { NavItem } from "../../enums/nav-items";
import { NavRoutes } from "../../enums/nav-routes";
import { NavButtonComponent } from "./nav-button/nav-button.component";
import { AccountComponent } from "./account/account.component";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [
    NavButtonComponent,
    AccountComponent,
  ],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
})
export class NavigationComponent implements OnInit {
  // here are all values for the navigation buttons. Each entry adds a nav-button with its values
  navItems: NavItem[] = [
    {
      tooltip: "Test",
      icon: "tuiIconBriefcaseLarge",
      link: NavRoutes.DASHBOARD,
    },
    {
      tooltip: "Settings",
      icon: "tuiIconSettingsLarge",
      link: NavRoutes.SETTINGS,
    },
  ];

  ngOnInit(): void {
  }

}
