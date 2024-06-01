import { Component } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-map-header',
  standalone: true,
  imports: [HeaderLayoutComponent, TranslateModule],
  templateUrl: './map-header.component.html',
  styleUrl: './map-header.component.scss',
})
export class MapHeaderComponent {}
