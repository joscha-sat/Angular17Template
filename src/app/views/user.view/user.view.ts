import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserHeader } from '../../components/user/user-header/user-header';
import { ViewLayout } from '../../other/layouts/view-layout/view-layout';
import { UserTable } from '../../components/user/user-table/user-table';

@Component({
  selector: 'app-user-view',
  imports: [UserHeader, ViewLayout, UserTable],
  templateUrl: './user.view.html',
  styleUrl: './user.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserView {
  // | services | --------------------------------------------------------------------------  ||
  // | normal methods | --------------------------------------------------------------------  ||
}
