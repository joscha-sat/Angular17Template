import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-user-header',
  imports: [TranslateModule, HeaderLayoutComponent],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  userService = inject(UserService);
}
