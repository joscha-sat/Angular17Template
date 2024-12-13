import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavRoutes } from '../../../other/enums/nav-routes';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../api/auth.service';

export type Option = {
  icon: string;
  ngxTitle: string;
  link?: NavRoutes;
};

@Component({
  selector: 'app-account',
  imports: [TranslateModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  userName = signal<string>('');
  isOpen = signal<boolean>(false);
  options = signal<Option[]>([
    {
      icon: '@tui.settings',
      ngxTitle: 'settings.title',
      link: NavRoutes.SETTINGS,
    },
    {
      icon: '@tui.log-out',
      ngxTitle: 'logout.title',
    },
  ]);

  protected readonly NavRoutes = NavRoutes;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

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
    if (option.ngxTitle.includes('logout')) {
      this.logOut();
    } else {
      this.router.navigate([option.link]).then();
    }
  }

  logOut() {
    this.authService.logout();
  }
}
