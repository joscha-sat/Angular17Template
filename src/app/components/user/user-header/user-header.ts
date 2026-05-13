import { Component, inject } from '@angular/core';
import { HeaderLayout } from '../../../other/layouts/header-layout/header-layout';
import { UserService } from '../../../api/user.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-user-header',
  imports: [HeaderLayout, TranslocoPipe],
  templateUrl: './user-header.html',
  styleUrl: './user-header.scss',
})
export class UserHeader {
  userService: UserService = inject(UserService);
}
