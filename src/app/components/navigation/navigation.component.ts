import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { NavItem } from '../../other/enums/nav-items';
import { ROUTES } from '../../other/enums/ROUTES';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navigation',
  imports: [RouterLinkActive, RouterLink, Button, TranslocoPipe],
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
    const translations: Record<string, string> =
      this.translocoService.translate([
        'tenant.title',
        'user.title',
        'customer.title-plural',
        'settings.title',
        'map.title',
      ]);

    this.navItems.set([
      { tooltip: translations[0], icon: 'pi pi-home', link: ROUTES.TENANT },
      { tooltip: translations[1], icon: 'pi pi-users', link: ROUTES.USER },
      {
        tooltip: translations[2],
        icon: 'pi pi-briefcase',
        link: ROUTES.CUSTOMERS,
      },
      { tooltip: translations[3], icon: 'pi pi-cog', link: ROUTES.SETTINGS },
      { tooltip: 'Test', icon: 'pi pi-wrench', link: 'test' },
    ]);
  }
}
