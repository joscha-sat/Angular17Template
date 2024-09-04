import { Component, input } from '@angular/core';
import { NavItem } from '../../../other/enums/nav-items';
import { TuiButton, TuiHint, TuiIcon } from '@taiga-ui/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [TuiButton, TuiHint, TuiIcon, RouterLinkActive, RouterLink],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  navItem = input.required<NavItem>();

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate([this.navItem().link]).then();
  }
}
