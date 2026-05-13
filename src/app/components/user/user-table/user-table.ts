import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../../api/user.service';
import { User } from '../../../models/User';
import { BaseTable } from '../../../other/abstract-classes/BaseTable';
import { TemplateTableEnterFetch } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';

const COLUMN_CONFIG: {
  displayedColumns: string[];
  headers: string[];
} = {
  displayedColumns: ['name', 'createdAt', 'updatedAt', 'actions'],
  headers: ['general.name', 'general.createdAt', 'general.updatedAt', ''],
};

@Component({
  selector: 'app-user-table',
  imports: [TemplateTableEnterFetch],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable extends BaseTable<User> implements OnInit {
  userService: UserService = inject(UserService);

  readonly columns: WritableSignal<string[]> = signal<string[]>(COLUMN_CONFIG.displayedColumns);
  readonly headers: WritableSignal<string[]> = signal<string[]>(COLUMN_CONFIG.headers);

  override ngOnInit(): void {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }

  setTableRefreshMethodName(): string {
    return 'getAllUsers';
  }

  setTableRefreshService(): UserService {
    return this.userService;
  }
}
