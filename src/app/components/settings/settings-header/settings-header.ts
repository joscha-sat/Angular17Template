import { Component } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-settings-header',
  imports: [HeaderLayoutComponent, TranslocoPipe],
  templateUrl: './settings-header.html',
  styleUrl: './settings-header.scss',
})
export class SettingsHeaderComponent {}
