import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiInputCountModule, TuiTabsModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TuiMobileTabsModule } from '@taiga-ui/addon-mobile';

// routePath has to be a child route to be loaded correctly into the router-outlet space
export type TabArray = {
  i18nTitle: string;
  routePath?: string;
  iconSrc?: string;
};

@Component({
  selector: 'app-base-tabs',
  standalone: true,
  imports: [
    FormsModule,
    TuiInputCountModule,
    TuiTabsModule,
    TuiSvgModule,
    RouterOutlet,
    RouterLink,
    TranslateModule,
    TuiMobileTabsModule,
  ],
  templateUrl: './base-tabs.component.html',
  styleUrl: './base-tabs.component.scss',
})
export class BaseTabsComponent implements OnInit {
  router = inject(Router);

  activeItemIndex = signal<number>(0);
  tabArray = input.required<TabArray[]>();
  loadChildView = input<boolean>(true);

  onTabIndexChange = output<number>();

  onClick() {
    // set timeout needed because otherwise the click event is emitted before the indexChange happened
    setTimeout(() => {
      this.onTabIndexChange.emit(this.activeItemIndex());
    }, 0);
  }

  ngOnInit(): void {
    this.navigateToFirstTabWithRoute();
  }

  hasOneOrMoreUrls() {
    return this.tabArray().some((tab) => tab.routePath);
  }

  private navigateToFirstTabWithRoute(): void {
    // Check if there is at least one tab with a URL, if not, return and do nothing
    if (!this.hasOneOrMoreUrls()) return;

    // Initialize a variable to track the index of the first tab with a route path
    let firstTabWithRoutePathIndex = -1;

    // Find the first tab where route path is defined.
    // If a tab with a route path is found, firstTabWithRoutePathIndex is updated with the corresponding index
    const firstTabWithRoutePath = this.tabArray().find((tab, index) => {
      const exists = Boolean(tab.routePath);
      if (exists) firstTabWithRoutePathIndex = index;
      return exists;
    });

    // check if a tab with a route and the corresponding index exist, if not, return and do nothing
    if (!firstTabWithRoutePath || firstTabWithRoutePathIndex === -1) return;

    // If a tab was found, navigate to the corresponding route
    this.router.navigate([firstTabWithRoutePath.routePath]).then();

    // Update the activeItemIndex with the index of the tab with a route
    this.activeItemIndex.set(firstTabWithRoutePathIndex);

    // Trigger the onClick method
    this.onClick();
  }
}
