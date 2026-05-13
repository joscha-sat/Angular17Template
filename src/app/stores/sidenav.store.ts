import { Injectable, signal, WritableSignal } from '@angular/core';

const SIDENAV_STATE_KEY: string = 'sidenav_expanded';
const COLLAPSED_WIDTH: number = 64;
const EXPANDED_WIDTH: number = 175;

@Injectable({
  providedIn: 'root',
})
export class SidenavStore {
  readonly expanded: WritableSignal<boolean> = signal<boolean>(false);
  readonly currentWidth: WritableSignal<number> = signal<number>(COLLAPSED_WIDTH);

  constructor() {
    this.loadState();
  }

  private loadState(): void {
    const savedState: string | null = localStorage.getItem(SIDENAV_STATE_KEY);
    const isExpanded: boolean = savedState === 'true';
    this.expanded.set(isExpanded);
    this.currentWidth.set(isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
  }

  toggle(): void {
    this.expanded.update((value: boolean): boolean => {
      const newValue: boolean = !value;
      localStorage.setItem(SIDENAV_STATE_KEY, String(newValue));
      this.currentWidth.set(newValue ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
      return newValue;
    });
  }
}
