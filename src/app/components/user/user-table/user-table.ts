import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SignalStoreTable } from '../../../other/abstract-classes/SignalStoreTable';
import { User } from '../../../models/User';
import {
  TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { Observable } from 'rxjs';
import { UserStore } from '../../../stores/user.store';
import { QueryParams, UserService } from '../../../api/user.service';

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

  override ngOnInit(): void {
    super.ngOnInit();
    this.translateHeaders(this.headers);
  }

  readonly columns: WritableSignal<string[]> = signal<string[]>(COLUMN_CONFIG.displayedColumns);
  readonly headers: WritableSignal<string[]> = signal<string[]>(COLUMN_CONFIG.headers);
}
