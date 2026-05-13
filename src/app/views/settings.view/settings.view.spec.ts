import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsView } from './settings.view';
import { SettingsHeader } from '../../components/settings/settings-header/settings-header';
import { ViewLayout } from '../../other/layouts/view-layout/view-layout';
import { SettingsTabs } from '../../components/settings/settings-tabs/settings-tabs';
import { getTranslocoModule } from '@app/other/transloco-testing';

describe('SettingsView', () => {
  let component: SettingsView;
  let fixture: ComponentFixture<SettingsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsView, ViewLayout, SettingsHeader, SettingsTabs, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
