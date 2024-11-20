import { Component } from '@angular/core';
import { SettingsHeaderComponent } from '../../components/settings/settings-header/settings-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { SettingsTabsComponent } from '../../components/settings/settings-tabs/settings-tabs.component';

@Component({
  selector: 'app-settings.view',
  imports: [
    ViewLayoutComponent,
    SettingsHeaderComponent,
    SettingsTabsComponent,
  ],
  templateUrl: './settings.view.component.html',
  styleUrl: './settings.view.component.scss',
})
export class SettingsViewComponent {}
