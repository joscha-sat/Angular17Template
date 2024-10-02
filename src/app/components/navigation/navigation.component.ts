import { Component, inject, OnInit, signal } from '@angular/core';
import { NavItem } from '../../other/enums/nav-items';
import { NavRoutes } from '../../other/enums/nav-routes';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { AccountComponent } from './account/account.component';
import { TranslateService } from '@ngx-translate/core';
import { RouterLinkActive } from '@angular/router';
import {
  TUI_DARK_MODE,
  TuiButton,
  TuiHintDirective,
  TuiIcon,
} from '@taiga-ui/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NavButtonComponent,
    AccountComponent,
    RouterLinkActive,
    TuiButton,
    TuiIcon,
    TuiHintDirective,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  navItems = signal<NavItem[]>([]);
  tooltip = 'Theme';
  darkMode = inject(TUI_DARK_MODE);

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.setTranslatedTextWithNavItems();
  }

  setTranslatedTextWithNavItems() {
    this.translateService
      .get([
        'tenant.title',
        'user.title',
        'customer.title-plural',
        'settings.title',
        'map.title',
      ])
      .subscribe((translations) => {
        this.navItems.set([
          // tenant
          {
            tooltip: translations['tenant.title'],
            icon: '@tui.home',
            link: NavRoutes.TENANT,
          },
          // user
          {
            tooltip: translations['user.title'],
            icon: '@tui.user',
            link: NavRoutes.USER,
          },
          // customer
          {
            tooltip: translations['customer.title-plural'],
            icon: '@tui.briefcase',
            link: NavRoutes.CUSTOMERS,
          },
          // map
          {
            tooltip: translations['map.title'],
            icon: '@tui.map-pin',
            link: NavRoutes.MAP,
          },
          // settings
          {
            tooltip: translations['settings.title'],
            icon: '@tui.settings',
            link: NavRoutes.SETTINGS,
          },

          // test TODO: REMOVE FOR PRODUCTION!!!
          {
            tooltip: 'Test',
            icon: '@tui.wrench',
            link: 'test',
          },
        ]);
      });
  }
}
