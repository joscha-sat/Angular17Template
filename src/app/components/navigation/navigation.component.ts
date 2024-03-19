import { Component, OnInit, signal } from "@angular/core";
import { NavItem } from "../../other/enums/nav-items";
import { NavRoutes } from "../../other/enums/nav-routes";
import { NavButtonComponent } from "./nav-button/nav-button.component";
import { AccountComponent } from "./account/account.component";
import { TranslateService } from "@ngx-translate/core";

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
  navItems = signal<NavItem[]>([]);

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.setTranslatedTextWithNavItems();
  }

  setTranslatedTextWithNavItems() {
    this.translateService.get(["tenant.title", "user.title", "customer.title-plural", "settings.title"]).subscribe(translations => {
      this.navItems.set([
        // tenant
        {
          tooltip: translations["tenant.title"],
          icon: "tuiIconHomeLarge",
          link: NavRoutes.TENANT,
        },
        // user
        {
          tooltip: translations["user.title"],
          icon: "tuiIconUserLarge",
          link: NavRoutes.USER,
        },
        // customer
        {
          tooltip: translations["customer.title-plural"],
          icon: "tuiIconBriefcaseLarge",
          link: NavRoutes.CUSTOMERS,
        },
        // settings
        {
          tooltip: translations["settings.title"],
          icon: "tuiIconSettingsLarge",
          link: NavRoutes.SETTINGS,
        },
      ]);
    });
  }
}


