import { Component } from '@angular/core';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { MapHeaderComponent } from '../../components/map/map-header/map-header.component';
import { GoogleMapComponent } from '../../components/map/google-map/google-map.component';

@Component({
  selector: 'app-map.view',
  imports: [ViewLayoutComponent, GoogleMapComponent, MapHeaderComponent],
  templateUrl: './map.view.component.html',
  styleUrl: './map.view.component.scss',
})
export class MapViewComponent {}
