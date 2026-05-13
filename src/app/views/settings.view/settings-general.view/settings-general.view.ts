import { Component } from '@angular/core';
import { SettingsLanguageSwitcherComponent } from '../../../components/settings/settings-tabs/settings-general/settings-language-switcher/settings-language-switcher';

@Component({
  selector: 'app-settings-general.view',
  imports: [SettingsLanguageSwitcherComponent],
  templateUrl: './settings-general.view.html',
  styleUrl: './settings-general.view.scss',
})
export class SettingsGeneralViewComponent {}
