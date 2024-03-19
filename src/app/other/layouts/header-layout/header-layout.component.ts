import { Component } from '@angular/core';
import { BaseBreadcrumbsComponent } from "../../../shared/base-breadcrumbs/base-breadcrumbs.component";

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [
    BaseBreadcrumbsComponent
  ],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent {

}
