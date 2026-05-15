import { Component, inject, type OnInit } from '@angular/core';
import { SignalStoreTable, type TableColumnConfig } from '../../../other/abstract-classes/SignalStoreTable';
import { User } from '../../../models/User';
import {
  type TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { type Observable } from 'rxjs';
import { UserStore } from '../../../stores/user.store';
import { type QueryParams, UserService } from '../../../api/user.service';

const COLUMN_CONFIG: TableColumnConfig = {
  displayedColumns: ['name', 'createdAt', 'updatedAt', 'actions'],
  headers: ['general.name', 'general.createdAt', 'general.updatedAt', ''],
};

@Component({
  selector: 'app-user-table',
  imports: [TemplateTableEnterFetch],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable extends SignalStoreTable<User> implements OnInit {
  private readonly userStore: InstanceType<typeof UserStore> = inject(UserStore);
  private readonly userService: UserService = inject(UserService);

  protected override tableDataSource: TableDataSource<User> = {
    entities: this.userStore.entities,
    totalCount: this.userStore.totalCount,
    loading: this.userStore.loading,
    sendLoadRequest: (parameters: unknown) => this.userStore.getAllUsers(parameters as QueryParams | undefined),
  };
  protected override onDataChanged$: Observable<unknown> = this.userService.refreshObservable$;
  protected override readonly columnConfig: TableColumnConfig = COLUMN_CONFIG;

  override ngOnInit(): void {
    super.ngOnInit();
    this.translateHeaders(this.headers);
  }
}
