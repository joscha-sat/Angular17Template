import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserHeaderComponent } from '../../components/user/user-header/user-header';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout';
import { UserTableComponent } from '../../components/user/user-table/user-table';

@Component({
  selector: 'app-user-view',
  imports: [UserHeaderComponent, ViewLayoutComponent, UserTableComponent],
  templateUrl: './user.view.html',
  styleUrl: './user.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserViewComponent {
  // | services | --------------------------------------------------------------------------  ||
  // | normal methods | --------------------------------------------------------------------  ||
}
