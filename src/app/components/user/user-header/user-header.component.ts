import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseTuiButtonComponent } from '../../../shared/base-tui-button/base-tui-button.component';

import { EditIconComponent } from '../../../shared/edit-icon/edit-icon.component';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { UserAddEditDialogComponent } from '../user-add-edit-dialog/user-add-edit-dialog.component';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { BaseTableSearchComponent } from '../../../shared/base-table-search/base-table-search.component';
import { UserService } from '../../../api/user.service';
import { BaseSearchComponent } from '../../../shared/base-search/base-search.component';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    TranslateModule,
    BaseTuiButtonComponent,
    HeaderLayoutComponent,
    EditIconComponent,
    BaseTableSearchComponent,
    BaseSearchComponent,
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  dialogService = inject(TuiDialogHelperService);
  userService = inject(UserService);

  openCreateUserDialog() {
    this.dialogService.openDialog(UserAddEditDialogComponent);
  }

  searchInUsers($event: string) {
    this.userService.search$.next($event);
  }
}
