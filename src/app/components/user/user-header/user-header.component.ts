import { Component, inject } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { UserService } from '../../../api/user.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-user-header',
  imports: [HeaderLayoutComponent, TranslocoPipe],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  userService: UserService = inject(UserService);
}
