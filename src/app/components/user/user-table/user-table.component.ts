import { Component, inject, signal } from '@angular/core';
import { BaseTableAsyncComponent } from '../../../shared/base-table-async/base-table-async.component';
import { AsyncPipe } from '@angular/common';
import { BaseTableComponent } from '../../../shared/base-table/base-table.component';
import { User } from '../../../other/models/User';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { UserAddEditDialogComponent } from '../user-add-edit-dialog/user-add-edit-dialog.component';
import { UserService } from '../../../api/user.service';
import { TableRefresherComponent } from '../../../other/abstract-class-components/table-refresher.component';
import { SuperAdminService } from '../../../api/super-admin.service';
import { TenantService } from '../../../api/tenant.service';
import { AuthService } from '../../../api/auth.service';
import { BaseBadgeComponent } from '../../../shared/base-badge/base-badge.component';
import { BaseSearchComponent } from '../../../shared/base-search/base-search.component';
import { Table } from '../../../other/types/Table.type';
import { DeleteIconComponent } from '../../../shared/base-icons/delete-icon/delete-icon.component';
import {
  BaseDeleteDialogComponent,
  DeleteContextData,
} from '../../../shared/base-delete-dialog/base-delete-dialog.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    BaseTableAsyncComponent,
    AsyncPipe,
    BaseTableComponent,
    BaseBadgeComponent,
    BaseSearchComponent,
    DeleteIconComponent,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent
  extends TableRefresherComponent<User>
  implements Table<User>
{
  dialogService = inject(TuiDialogHelperService<User>);
  userService = inject(UserService);
  superAdminService = inject(SuperAdminService);
  tenantService = inject(TenantService);
  authService = inject(AuthService);

  headers = signal<string[]>([
    'general.firstName',
    'general.lastName',
    'general.phone-number',
    'general.email',
    'general.active',
    'general.delete',
  ]);
  columns = signal<string[]>([
    'firstName',
    'lastName',
    'phone',
    'email',
    'active',
    'delete',
  ]);

  get tenantId(): string {
    // case super admin
    if (this.superAdminService.isSuperAdmin()) {
      return this.tenantService.selectedTenantId();
    }
    // case logged in tenant
    else {
      return this.authService.getLoggedInUser()?.tenantId ?? '';
    }
  }

  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }

  setTableRefreshService() {
    return this.userService;
  }

  // TODO enable to filter by tenantID
  // override getAdditionalParams() {
  //   return { tenantId: this.tenantId };
  // }

  setTableRefreshMethodName() {
    return 'getAllUsers';
  }

  userClicked($event: User) {
    const user = new User($event);
    this.dialogService.openDialog(UserAddEditDialogComponent, user);
  }

  trashClicked(user: User) {
    const deleteContextData: DeleteContextData = {
      deleteMethod: 'deleteUserById',
      model: user,
      service: this.userService,
    };

    this.dialogService.openDialog(BaseDeleteDialogComponent, deleteContextData);
  }
}
