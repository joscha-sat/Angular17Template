import { Component } from '@angular/core';
import { SettingsLanguageSwitcher } from '../../../components/settings/settings-tabs/settings-general/settings-language-switcher/settings-language-switcher';

@Component({
  selector: 'app-settings-general.view',
  imports: [SettingsLanguageSwitcher],
  templateUrl: './settings-general.view.html',
  styleUrl: './settings-general.view.scss',
})
export class SettingsGeneralView {}
