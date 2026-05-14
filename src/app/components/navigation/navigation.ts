import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SidenavStore } from '../../stores/sidenav.store';
import { NavItem } from '../../other/enums/nav-items';
import { ROUTES } from '../../other/enums/ROUTES';
import { translateSignal, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-navigation',
  imports: [RouterLinkActive, RouterLink, Button, TooltipModule, TranslocoPipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  private readonly sidenavStore: SidenavStore = inject(SidenavStore);

  private readonly tenantTitle: Signal<string> = translateSignal('tenant.title');
  private readonly userTitle: Signal<string> = translateSignal('user.title');
  private readonly settingsTitle: Signal<string> = translateSignal('settings.title');

  readonly navItems: Signal<NavItem[]> = computed<NavItem[]>(() => [
    { tooltip: this.tenantTitle(), icon: 'pi pi-home', link: ROUTES.TENANT },
    { tooltip: this.userTitle(), icon: 'pi pi-users', link: ROUTES.USER },
    { tooltip: this.settingsTitle(), icon: 'pi pi-cog', link: ROUTES.SETTINGS },
    { tooltip: 'Test', icon: 'pi pi-wrench', link: 'test' },
  ]);

  get expanded(): boolean {
    return this.sidenavStore.expanded();
  }

  toggleExpanded(): void {
    this.sidenavStore.toggle();
  }
}
