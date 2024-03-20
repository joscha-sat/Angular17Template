import { Component, Input } from '@angular/core';
import { NavItem } from '../../../other/enums/nav-items';
import { TuiButtonModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiHintModule,
    TuiSvgModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  @Input() navItem: NavItem | undefined;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate([this.navItem!.link]).then();
  }
}
