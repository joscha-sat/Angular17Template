import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { NavItem } from '../../other/enums/nav-items';
import { NavRoutes } from '../../other/enums/nav-routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [RouterLinkActive, MatIcon, RouterLink, MatMiniFabButton],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  navItems = signal<NavItem[]>([]);
  private readonly translateService = inject(TranslateService);

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
            icon: 'home',
            link: NavRoutes.TENANT,
          },
          // user
          {
            tooltip: translations['user.title'],
            icon: 'group',
            link: NavRoutes.USER,
          },
          // customer
          {
            tooltip: translations['customer.title-plural'],
            icon: 'cases',
            link: NavRoutes.CUSTOMERS,
          },
          // map
          // {
          //   tooltip: translations['map.title'],
          //   icon: 'map-pin',
          //   link: NavRoutes.MAP,
          // },
          // settings
          {
            tooltip: translations['settings.title'],
            icon: 'settings',
            link: NavRoutes.SETTINGS,
          },

          // test TODO: REMOVE FOR PRODUCTION!!!
          {
            tooltip: 'Test',
            icon: 'handyman',
            link: 'test',
          },
        ]);
      });
  }
}
