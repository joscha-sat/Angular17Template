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
    const tabList = this.tabArray();

    if (!tabList.some((tab) => tab.routePath)) return;

    let firstTabWithRoutePathIndex = -1;
    const firstTabWithRoutePath = tabList.find((tab, index) => {
      const exists = Boolean(tab.routePath);
      if (exists) firstTabWithRoutePathIndex = index;
      return exists;
    });

    if (!firstTabWithRoutePath || firstTabWithRoutePathIndex === -1) return;

    this.router.navigate([firstTabWithRoutePath.routePath]).then();
    this.activeItemIndex.set(firstTabWithRoutePathIndex);
    this.onClick();
  }
}
