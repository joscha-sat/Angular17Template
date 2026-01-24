import { Component } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-map-header',
  imports: [HeaderLayoutComponent, TranslocoPipe],
  templateUrl: './map-header.component.html',
  styleUrl: './map-header.component.scss',
})
export class MapHeaderComponent {}
