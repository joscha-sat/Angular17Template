import { Component } from '@angular/core';
import { SettingsLanguageSwitcherComponent } from '../../../components/settings/settings-tabs/settings-general/settings-language-switcher/settings-language-switcher.component';

@Component({
  selector: 'app-settings-general.view',
  imports: [SettingsLanguageSwitcherComponent],
  templateUrl: './settings-general.view.component.html',
  styleUrl: './settings-general.view.component.scss',
})
export class SettingsGeneralViewComponent {}
