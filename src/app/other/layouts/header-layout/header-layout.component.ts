import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  imports: [],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
})
export class HeaderLayoutComponent {
  useBreadcrumbs = input<boolean>(true);
}
