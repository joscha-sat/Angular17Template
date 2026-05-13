import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsHeader } from './settings-header';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { HeaderLayout } from '../../../other/layouts/header-layout/header-layout';

describe('SettingsHeader', () => {
  let component: SettingsHeader;
  let fixture: ComponentFixture<SettingsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsHeader, HeaderLayout, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
