import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseTuiButtonComponent } from '../../../shared/base-tui-button/base-tui-button.component';

import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { UserAddEditDialogComponent } from '../user-add-edit-dialog/user-add-edit-dialog.component';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { UserService } from '../../../api/user.service';
import { BaseSearchComponent } from '../../../shared/base-search/base-search.component';
import { BaseSearchDateComponent } from '../../../shared/base-search-date/base-search-date.component';
import {
  BaseTabsComponent,
  TabArray,
} from '../../../shared/base-tabs/base-tabs.component';

@Component({
  selector: 'app-user-header',
  imports: [
    TranslateModule,
    BaseTuiButtonComponent,
    HeaderLayoutComponent,
    BaseSearchComponent,
    BaseSearchDateComponent,
    BaseTabsComponent,
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  dialogService = inject(TuiDialogHelperService);
  userService = inject(UserService);
  tabArray = signal<TabArray[]>([
    { i18nTitle: 'general.all' },
    { i18nTitle: 'general.active' },
    { i18nTitle: 'general.inactive' },
  ]);

  openCreateUserDialog() {
    this.dialogService.openDialog(UserAddEditDialogComponent);
  }
}
