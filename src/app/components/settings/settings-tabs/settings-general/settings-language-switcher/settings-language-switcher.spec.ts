import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsLanguageSwitcher } from './settings-language-switcher';

describe('SettingsLanguageSwitcher', () => {
  let component: SettingsLanguageSwitcher;
  let fixture: ComponentFixture<SettingsLanguageSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsLanguageSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsLanguageSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
