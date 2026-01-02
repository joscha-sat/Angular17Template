import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MapHeaderComponent } from './map-header.component';

describe('MapHeaderComponent', () => {
  let component: MapHeaderComponent;
  let fixture: ComponentFixture<MapHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapHeaderComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
