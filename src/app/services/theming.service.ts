import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<THEME>(THEME.LIGHT);

  constructor() {
    this.getThemeFromLocalStorage();
  }

  toggleTheme() {
    this.setTheme(
      this.currentTheme() === THEME.DARK ? THEME.LIGHT : THEME.DARK,
    );
  }

  setTheme(theme: THEME) {
    this.currentTheme.set(theme);

    if (theme === THEME.DARK) {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }

    localStorage.setItem('theme', theme);
  }

  getThemeFromLocalStorage() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme as THEME);
    }
  }
}
