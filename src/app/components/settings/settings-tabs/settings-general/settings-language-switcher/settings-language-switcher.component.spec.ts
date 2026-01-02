import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsLanguageSwitcherComponent } from './settings-language-switcher.component';

describe('SettingsLanguageSwitcherComponent', () => {
  let component: SettingsLanguageSwitcherComponent;
  let fixture: ComponentFixture<SettingsLanguageSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsLanguageSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsLanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
