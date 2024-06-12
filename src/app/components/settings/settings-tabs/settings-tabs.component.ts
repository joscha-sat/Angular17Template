import { Component, signal } from '@angular/core';
import {
  BaseTabsComponent,
  TabArray,
} from '../../../shared/base-tabs/base-tabs.component';
import { NavRoutes } from '../../../other/enums/nav-routes';

@Component({
  selector: 'app-settings-tabs',
  standalone: true,
  imports: [BaseTabsComponent],
  templateUrl: './settings-tabs.component.html',
  styleUrl: './settings-tabs.component.scss',
})
export class SettingsTabsComponent {
  tabs = signal<TabArray[]>([
    {
      name: 'Allgemein',
      routePath: NavRoutes.SETTINGS + '/' + NavRoutes.GENERAL,
    },
  ]);
}
