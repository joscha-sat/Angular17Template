import { Component, computed, inject, type Signal, type TemplateRef, viewChild } from '@angular/core';
import { SignalStoreTable, type TableColumnConfig } from '../../../other/abstract-classes/SignalStoreTable';
import { User } from '../../../models/User';
import {
  type TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
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
export class UserTable extends SignalStoreTable<User> {
  private readonly userStore: InstanceType<typeof UserStore> = inject(UserStore);

  protected readonly nameTemplate: Signal<TemplateRef<unknown> | undefined> = viewChild<TemplateRef<unknown>>(
    'name',
  ) as Signal<TemplateRef<unknown> | undefined>;
  protected readonly actionsTemplate: Signal<TemplateRef<unknown> | undefined> = viewChild<TemplateRef<unknown>>(
    'actions',
  ) as Signal<TemplateRef<unknown> | undefined>;
  protected readonly customCellTemplates: Signal<Record<string, TemplateRef<unknown>>> = computed(() => {
    const nameTemplate: TemplateRef<unknown> | undefined = this.nameTemplate();
    const actionsTemplate: TemplateRef<unknown> | undefined = this.actionsTemplate();

    return {
      ...(nameTemplate ? { name: nameTemplate } : {}),
      ...(actionsTemplate ? { actions: actionsTemplate } : {}),
    };
  });

  protected override readonly service: UserService = inject(UserService);
  protected override readonly columnConfig: TableColumnConfig = COLUMN_CONFIG;
  protected override readonly tableDataSource: TableDataSource<User> = this.createTableDataSource(
    this.userStore,
    (parameters: unknown) => this.userStore.getAllUsers(parameters as QueryParams | undefined),
  );
}
