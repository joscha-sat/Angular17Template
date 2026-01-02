import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsHeaderComponent } from './settings-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';

describe('SettingsHeaderComponent', () => {
  let component: SettingsHeaderComponent;
  let fixture: ComponentFixture<SettingsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SettingsHeaderComponent,
        HeaderLayoutComponent,
        TranslateModule.forRoot(),
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
