import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  imports: [],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
})
export class HeaderLayoutComponent {
  useBreadcrumbs: InputSignal<boolean> = input<boolean>(true);
}
