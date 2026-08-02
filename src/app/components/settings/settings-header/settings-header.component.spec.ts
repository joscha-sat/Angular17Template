import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsHeaderComponent } from './settings-header.component';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';

describe('SettingsHeaderComponent', () => {
  let component: SettingsHeaderComponent;
  let fixture: ComponentFixture<SettingsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SettingsHeaderComponent,
        HeaderLayoutComponent,
        getTranslocoModule(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
