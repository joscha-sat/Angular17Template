import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SidenavStore } from '../../stores/sidenav.store';
import { NavItem } from '../../other/enums/nav-items';
import { ROUTES } from '../../other/enums/ROUTES';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navigation',
  imports: [RouterLinkActive, RouterLink, Button, TooltipModule, TranslocoPipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation implements OnInit {
  readonly navItems: WritableSignal<NavItem[]> = signal<NavItem[]>([]);

  private readonly translocoService: TranslocoService = inject(TranslocoService);
  private readonly sidenavStore: SidenavStore = inject(SidenavStore);

  get expanded(): boolean {
    return this.sidenavStore.expanded();
  }

  ngOnInit(): void {
    this.setTranslatedTextWithNavItems();
  }

  setTranslatedTextWithNavItems(): void {
    const translations: Record<string, string> = this.translocoService.translate([
      'tenant.title',
      'user.title',
      'settings.title',
      'map.title',
    ]);

    this.navItems.set([
      { tooltip: translations[0], icon: 'pi pi-home', link: ROUTES.TENANT },
      { tooltip: translations[1], icon: 'pi pi-users', link: ROUTES.USER },
      { tooltip: translations[3], icon: 'pi pi-cog', link: ROUTES.SETTINGS },
      { tooltip: 'Test', icon: 'pi pi-wrench', link: 'test' },
    ]);
  }

  toggleExpanded(): void {
    this.sidenavStore.toggle();
  }
}
