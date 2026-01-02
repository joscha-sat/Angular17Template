import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapViewComponent } from './map.view.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { MapHeaderComponent } from '../../components/map/map-header/map-header.component';
import { TranslateModule } from '@ngx-translate/core';

// Mock the Google Maps API before loading the component
const mockGoogle = {
  maps: {
    Map: class {
      constructor() {}
      setCenter() {}
      setZoom() {}
    },
    MapTrafficLayer: class {
      constructor() {}
      setMap() {}
    },
    MapOptions: {},
  },
};

// Add to window object
Object.defineProperty(window, 'google', {
  value: mockGoogle,
  writable: true,
});

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MapViewComponent,
        ViewLayoutComponent,
        MapHeaderComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
