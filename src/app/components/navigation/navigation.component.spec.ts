import type { MockedObject } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let translateService: MockedObject<TranslateService>;

  beforeEach(async () => {
    const translateSpy = {
      get: vi.fn().mockName('TranslateService.get'),
    };

    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        RouterLink,
        RouterLinkActive,
        MatIcon,
        MatMiniFabButton,
      ],
      providers: [
        { provide: TranslateService, useValue: translateSpy },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    translateService = TestBed.inject(
      TranslateService,
    ) as MockedObject<TranslateService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize nav items on ngOnInit', () => {
    const mockTranslations = {
      'tenant.title': 'Tenant',
      'user.title': 'User',
      'customer.title-plural': 'Customers',
      'settings.title': 'Settings',
      'map.title': 'Map',
    };

    translateService.get.mockReturnValue(of(mockTranslations));

    component.ngOnInit();
    fixture.detectChanges();

    expect(translateService.get).toHaveBeenCalledWith([
      'tenant.title',
      'user.title',
      'customer.title-plural',
      'settings.title',
      'map.title',
    ]);

    const navItems = component.navItems();
    expect(navItems).toHaveLength(5);
    expect(navItems[0].tooltip).toBe('Tenant');
    expect(navItems[0].icon).toBe('home');
    expect(navItems[1].tooltip).toBe('User');
    expect(navItems[1].icon).toBe('group');
  });

  it('should set translated text with nav items', () => {
    const mockTranslations = {
      'tenant.title': 'Tenant',
      'user.title': 'User',
      'customer.title-plural': 'Customers',
      'settings.title': 'Settings',
      'map.title': 'Map',
    };

    translateService.get.mockReturnValue(of(mockTranslations));

    component.setTranslatedTextWithNavItems();
    fixture.detectChanges();

    expect(translateService.get).toHaveBeenCalledWith([
      'tenant.title',
      'user.title',
      'customer.title-plural',
      'settings.title',
      'map.title',
    ]);

    const navItems = component.navItems();
    expect(navItems[3].tooltip).toBe('Settings');
    expect(navItems[3].icon).toBe('settings');
  });
});
