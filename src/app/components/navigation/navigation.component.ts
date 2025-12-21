import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { NavItem } from '../../other/enums/nav-items';
import { ROUTES } from '../../other/enums/ROUTES';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [RouterLinkActive, MatIcon, RouterLink, MatMiniFabButton],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  readonly navItems: WritableSignal<NavItem[]> = signal<NavItem[]>([]);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  ngOnInit(): void {
    this.setTranslatedTextWithNavItems();
  }

  setTranslatedTextWithNavItems(): void {
    this.translateService
      .get([
        'tenant.title',
        'user.title',
        'customer.title-plural',
        'settings.title',
        'map.title',
      ])
      .subscribe((translations: { [key: string]: string }) => {
        this.navItems.set([
          // tenant
          {
            tooltip: translations['tenant.title'],
            icon: 'home',
            link: ROUTES.TENANT,
          },
          // user
          {
            tooltip: translations['user.title'],
            icon: 'group',
            link: ROUTES.USER,
          },
          // customer
          {
            tooltip: translations['customer.title-plural'],
            icon: 'cases',
            link: ROUTES.CUSTOMERS,
          },
          // map
          // {
          //   tooltip: translations['map.title'],
          //   icon: 'map-pin',
          //   link: ROUTES.MAP,
          // },
          // settings
          {
            tooltip: translations['settings.title'],
            icon: 'settings',
            link: ROUTES.SETTINGS,
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
