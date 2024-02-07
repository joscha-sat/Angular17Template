import { Component, OnInit, signal } from "@angular/core";
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from "@taiga-ui/core";
import { Router, RouterLink } from "@angular/router";
import { NavRoutes } from "../../../enums/nav-routes";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { tuiIconLogOut, tuiIconSettings } from "@taiga-ui/icons";
import { AuthService } from "../../../api/auth.service";
import { SuperAdminService } from "../../../api/super-admin.service";

export type Option = {
  icon: string,
  ngxTitle: string,
  link?: NavRoutes
}

@Component({
  selector: "app-account",
  standalone: true,
  imports: [
    TuiDataListModule,
    RouterLink,
    TranslateModule,
    TuiSvgModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
  ],
  templateUrl: "./account.component.html",
  styleUrl: "./account.component.scss",
})
export class AccountComponent implements OnInit {
  userName = signal<string>("");
  isOpen = signal<boolean>(false);
  options = signal<Option[]>([
    {
      icon: "tuiIconSettings",
      ngxTitle: "nav.settings",
      link: NavRoutes.SETTINGS,
    },
    {
      icon: "tuiIconLogOut",
      ngxTitle: "logout.title",
    },
  ]);

  protected readonly NavRoutes = NavRoutes;
  protected readonly tuiIconLogOut = tuiIconLogOut;
  protected readonly tuiIconSettings = tuiIconSettings;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private superAdminService: SuperAdminService,
  ) {
  }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    const user = this.authService.getLoggedInUser();
    if (user) {
      this.userName.set(user.firstName);
    }
  }

  onOptionsClick(option: Option) {
    if (option.ngxTitle.includes("logout")) {

      this.logOut();
    } else {
      this.router.navigate([option.link]).then();
    }
  }

  logOut() {
    console.log("logout");
  }
}
