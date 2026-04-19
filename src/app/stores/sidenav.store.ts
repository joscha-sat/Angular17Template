import { Injectable, signal } from '@angular/core';

const SIDENAV_STATE_KEY = 'sidenav_expanded';
const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 175;

@Injectable({
  providedIn: 'root',
})
export class SidenavStore {
  readonly expanded = signal<boolean>(false);
  readonly collapsedWidth = signal<number>(COLLAPSED_WIDTH);
  readonly expandedWidth = signal<number>(EXPANDED_WIDTH);

  readonly currentWidth = signal<number>(COLLAPSED_WIDTH);

  constructor() {
    this.loadState();
  }

  private loadState(): void {
    const savedState = localStorage.getItem(SIDENAV_STATE_KEY);
    const isExpanded = savedState === 'true';
    this.expanded.set(isExpanded);
    this.currentWidth.set(isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
  }

  toggle(): void {
    this.expanded.update((value) => {
      const newValue = !value;
      localStorage.setItem(SIDENAV_STATE_KEY, String(newValue));
      this.currentWidth.set(newValue ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
      return newValue;
    });
  }
}
