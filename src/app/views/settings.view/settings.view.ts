import { Component } from '@angular/core';
import { SettingsHeaderComponent } from '../../components/settings/settings-header/settings-header';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout';
import { SettingsTabsComponent } from '../../components/settings/settings-tabs/settings-tabs';

@Component({
  selector: 'app-settings.view',
  imports: [ViewLayoutComponent, SettingsHeaderComponent, SettingsTabsComponent],
  templateUrl: './settings.view.html',
  styleUrl: './settings.view.scss',
})
export class SettingsViewComponent {}
