import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  imports: [],
  templateUrl: './header-layout.html',
  styleUrl: './header-layout.scss',
})
export class HeaderLayout {
  readonly useBreadcrumbs: InputSignal<boolean> = input<boolean>(true);
}
