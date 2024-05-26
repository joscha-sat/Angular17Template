import { Component, inject, signal } from '@angular/core';
import { BaseTableAsyncComponent } from '../../../shared/base-table-async/base-table-async.component';
import { AsyncPipe } from '@angular/common';
import { BaseTableComponent } from '../../../shared/base-table/base-table.component';
import { User } from '../../../other/models/User';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { UserAddEditDialogComponent } from '../user-add-edit-dialog/user-add-edit-dialog.component';
import { UserService } from '../../../api/user.service';
import { TableRefresherComponent } from '../../../shared/table-refresher/table-refresher.component';
import { SuperAdminService } from '../../../api/super-admin.service';
import { TenantService } from '../../../api/tenant.service';
import { AuthService } from '../../../api/auth.service';
import { BaseBadgeComponent } from '../../../shared/base-badge/base-badge.component';
import { BaseSearchComponent } from '../../../shared/base-search/base-search.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    BaseTableAsyncComponent,
    AsyncPipe,
    BaseTableComponent,
    BaseBadgeComponent,
    BaseSearchComponent,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent extends TableRefresherComponent<User> {
  dialogService = inject(TuiDialogHelperService<User>);
  userService = inject(UserService);
  superAdminService = inject(SuperAdminService);
  tenantService = inject(TenantService);
  authService = inject(AuthService);

  tableHeaders = signal<string[]>([
    'Vorname',
    'Nachname',
    'Telefon',
    'Email',
    'Aktiv',
  ]);
  tableColumns = signal<string[]>([
    'firstName',
    'lastName',
    'phone',
    'email',
    'active',
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

  setTableRefreshService() {
    return this.userService;
  }

  setTableRefreshMethodName() {
    return 'getAllUsers';
  }

  // TODO enable to filter by tenantID
  // override getAdditionalParams() {
  //   return { tenantId: this.tenantId };
  // }

  userClicked($event: User) {
    const user = new User($event);
    this.dialogService.openDialog(UserAddEditDialogComponent, user);
  }
}
