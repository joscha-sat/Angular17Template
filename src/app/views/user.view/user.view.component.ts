import { Component } from '@angular/core';
import { UserHeaderComponent } from '../../components/user/user-header/user-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';

@Component({
  selector: 'app-user.view',
  imports: [UserHeaderComponent, ViewLayoutComponent],
  templateUrl: './user.view.component.html',
  styleUrl: './user.view.component.scss',
})
export class UserViewComponent {
  // | services | --------------------------------------------------------------------------  ||
  // | normal methods | --------------------------------------------------------------------  ||
}
