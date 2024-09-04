import { Component, OnInit, signal } from '@angular/core';
import { NavItem } from '../../other/enums/nav-items';
import { NavRoutes } from '../../other/enums/nav-routes';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { AccountComponent } from './account/account.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavButtonComponent, AccountComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  navItems = signal<NavItem[]>([]);

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
