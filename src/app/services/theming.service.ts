import { inject, Injectable, signal, type WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  private readonly document: Document = inject(DOCUMENT);
  private readonly currentTheme: WritableSignal<THEME> = signal<THEME>(THEME.LIGHT);

  constructor() {
    this.getThemeFromLocalStorage();
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme() === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  }

  setTheme(theme: THEME): void {
    this.currentTheme.set(theme);

    this.document.documentElement.classList.toggle('dark-mode', theme === THEME.DARK);

    localStorage.setItem('theme', theme);
  }

  getThemeFromLocalStorage(): void {
    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme as THEME);
    }
  }
}
