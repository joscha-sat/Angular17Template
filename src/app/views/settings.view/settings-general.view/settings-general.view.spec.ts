import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsGeneralViewComponent } from './settings-general.view';

describe('SettingsGeneralViewComponent', () => {
  let component: SettingsGeneralViewComponent;
  let fixture: ComponentFixture<SettingsGeneralViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsGeneralViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsGeneralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
