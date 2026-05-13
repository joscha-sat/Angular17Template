import { Component } from '@angular/core';
import { SettingsHeader } from '../../components/settings/settings-header/settings-header';
import { ViewLayout } from '../../other/layouts/view-layout/view-layout';
import { SettingsTabs } from '../../components/settings/settings-tabs/settings-tabs';

@Component({
  selector: 'app-settings.view',
  imports: [ViewLayout, SettingsHeader, SettingsTabs],
  templateUrl: './settings.view.html',
  styleUrl: './settings.view.scss',
})
export class SettingsView {}
