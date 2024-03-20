import { Component } from '@angular/core';
import { UserHeaderComponent } from '../../components/user/user-header/user-header.component';
import { UserTableComponent } from '../../components/user/user-table/user-table.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';

@Component({
  selector: 'app-user.view',
  standalone: true,
  imports: [UserHeaderComponent, UserTableComponent, ViewLayoutComponent],
  templateUrl: './user.view.component.html',
  styleUrl: './user.view.component.scss',
})
export class UserViewComponent {
  // | services | --------------------------------------------------------------------------  ||
  // | normal methods | --------------------------------------------------------------------  ||
}
