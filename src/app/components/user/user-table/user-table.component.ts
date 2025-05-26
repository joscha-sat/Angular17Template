import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../api/user.service';
import { User } from '../../../models/User';
import { BaseTableComponent } from '../../../other/abstract-classes/refreshBaseTable';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';

const COLUMN_CONFIG = {
  displayedColumns: ['name', 'createdAt', 'updatedAt', 'actions'],
  headers: ['general.name', 'general.createdAt', 'general.updatedAt', ''],
};

@Component({
  selector: 'app-user-table',
  imports: [TemplateTableEnterFetchComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent
  extends BaseTableComponent<User>
  implements OnInit
{
  userService = inject(UserService);

  columns = signal(COLUMN_CONFIG.displayedColumns);
  headers = signal(COLUMN_CONFIG.headers);

  override ngOnInit(): void {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }

  setTableRefreshMethodName(): string {
    return 'getAllUsers';
  }

  setTableRefreshService(): any {
    return this.userService;
  }
}
