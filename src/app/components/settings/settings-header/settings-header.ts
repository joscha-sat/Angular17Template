import { Component } from '@angular/core';
import { HeaderLayout } from '../../../other/layouts/header-layout/header-layout';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-settings-header',
  imports: [HeaderLayout, TranslocoPipe],
  templateUrl: './settings-header.html',
  styleUrl: './settings-header.scss',
})
export class SettingsHeader {}
