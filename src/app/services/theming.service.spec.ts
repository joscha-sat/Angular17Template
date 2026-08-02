import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { THEME, ThemingService } from './theming.service';

describe('ThemingService', () => {
  let service: ThemingService;
  let documentMock: Document;
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};

    // Mock localStorage
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
      },
      writable: true,
    });

    // Mock document
    documentMock = {
      documentElement: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
          contains: vi.fn(),
        },
      },
    } as unknown as Document;

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: documentMock }],
    });

    service = TestBed.inject(ThemingService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setTheme', () => {
    it('should set dark theme correctly', () => {
      service.setTheme(THEME.DARK);

      expect(documentMock.documentElement.classList.add).toHaveBeenCalledWith('dark-mode');
      expect(documentMock.documentElement.classList.remove).not.toHaveBeenCalledWith('dark-mode');
      expect(localStorageMock['theme']).toBe(THEME.DARK);
    });

    it('should set light theme correctly', () => {
      service.setTheme(THEME.LIGHT);

      expect(documentMock.documentElement.classList.remove).toHaveBeenCalledWith('dark-mode');
      expect(documentMock.documentElement.classList.add).not.toHaveBeenCalledWith('dark-mode');
      expect(localStorageMock['theme']).toBe(THEME.LIGHT);
    });
  });

  describe('getThemeFromLocalStorage', () => {
    it('should set theme from localStorage when theme exists', () => {
      const setThemeSpy = vi.spyOn(service, 'setTheme');

      localStorageMock['theme'] = THEME.DARK;
      service.getThemeFromLocalStorage();

      expect(setThemeSpy).toHaveBeenCalledWith(THEME.DARK);
    });

    it('should not change theme when no theme in localStorage', () => {
      const setThemeSpy = vi.spyOn(service, 'setTheme');

      service.getThemeFromLocalStorage();

      expect(setThemeSpy).not.toHaveBeenCalled();
    });

    it('should handle invalid theme value in localStorage gracefully', () => {
      const setThemeSpy = vi.spyOn(service, 'setTheme');

      localStorageMock['theme'] = 'invalid-theme';
      service.getThemeFromLocalStorage();

      expect(setThemeSpy).toHaveBeenCalledWith('invalid-theme');
    });
  });

  describe('localStorage integration', () => {
    it('should persist theme choice to localStorage', () => {
      service.setTheme(THEME.DARK);
      expect(localStorageMock['theme']).toBe(THEME.DARK);

      service.setTheme(THEME.LIGHT);
      expect(localStorageMock['theme']).toBe(THEME.LIGHT);
    });
  });
});
