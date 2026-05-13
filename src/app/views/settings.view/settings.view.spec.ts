import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsViewComponent } from './settings.view';
import { SettingsHeaderComponent } from '../../components/settings/settings-header/settings-header';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout';
import { SettingsTabsComponent } from '../../components/settings/settings-tabs/settings-tabs';
import { getTranslocoModule } from '@app/other/transloco-testing';

describe('SettingsViewComponent', () => {
  let component: SettingsViewComponent;
  let fixture: ComponentFixture<SettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SettingsViewComponent,
        ViewLayoutComponent,
        SettingsHeaderComponent,
        SettingsTabsComponent,
        getTranslocoModule(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
