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
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navigation',
  imports: [RouterLinkActive, MatIcon, RouterLink, MatMiniFabButton],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  readonly navItems: WritableSignal<NavItem[]> = signal<NavItem[]>([]);
  private readonly translocoService: TranslocoService =
    inject(TranslocoService);

  ngOnInit(): void {
    this.setTranslatedTextWithNavItems();
  }

  setTranslatedTextWithNavItems(): void {
    const translations = this.translocoService.translate([
      'tenant.title',
      'user.title',
      'customer.title-plural',
      'settings.title',
      'map.title',
    ]);

    this.navItems.set([
      // tenant
      {
        tooltip: translations[0],
        icon: 'home',
        link: ROUTES.TENANT,
      },
      // user
      {
        tooltip: translations[1],
        icon: 'group',
        link: ROUTES.USER,
      },
      // customer
      {
        tooltip: translations[2],
        icon: 'cases',
        link: ROUTES.CUSTOMERS,
      },
      // map
      // {
      //   tooltip: translations[4],
      //   icon: 'map-pin',
      //   link: ROUTES.MAP,
      // },
      // settings
      {
        tooltip: translations[3],
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
  }
}
