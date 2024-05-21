import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';

@Component({
  selector: 'app-settings-header',
  standalone: true,
  imports: [HeaderLayoutComponent, TranslateModule],
  templateUrl: './settings-header.component.html',
  styleUrl: './settings-header.component.scss',
})
export class SettingsHeaderComponent {}
