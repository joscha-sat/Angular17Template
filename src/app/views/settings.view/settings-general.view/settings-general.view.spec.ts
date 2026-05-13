import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsGeneralView } from './settings-general.view';

describe('SettingsGeneralView', () => {
  let component: SettingsGeneralView;
  let fixture: ComponentFixture<SettingsGeneralView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsGeneralView],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsGeneralView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
