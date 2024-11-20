import { Component } from '@angular/core';
import { GoogleMap, MapTrafficLayer } from '@angular/google-maps';

export type MapLocation = {
  lat: number;
  lng: number;
};

@Component({
  selector: 'app-google-map',
  imports: [GoogleMap, MapTrafficLayer],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss',
})
export class GoogleMapComponent {
  // defines the starting point
  startingPoint: MapLocation = {
    lat: 53.076726140574884,
    lng: 8.804061738643137,
  };
  // All configuration related stuff is going in here
  mapOptions: google.maps.MapOptions = {
    center: this.startingPoint,
    disableDefaultUI: true,
    zoom: 16,
  };
}
