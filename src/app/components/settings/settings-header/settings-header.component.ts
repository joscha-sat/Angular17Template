import { Component } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-settings-header',
  imports: [HeaderLayoutComponent, TranslocoPipe],
  templateUrl: './settings-header.component.html',
  styleUrl: './settings-header.component.scss',
})
export class SettingsHeaderComponent {}
