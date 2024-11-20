import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BaseTableComponent } from '../../shared/base-table/base-table.component';
import { Table } from '../../other/types/Table.type';
import { User } from '../../other/models/User';
import { TableRefresherComponent } from '../../other/abstract-class-components/table-refresher.component';
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-test-view',
  imports: [BaseTableComponent],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss',
})
export class TestViewComponent
  extends TableRefresherComponent<User>
  implements Table<User>, OnInit
{
  userService = inject(UserService);

  columns: WritableSignal<(keyof User | 'delete' | 'edit')[]> = signal([
    'firstName',
  ]);
  headers: WritableSignal<string[]> = signal(['general.firstName']);

  setTableRefreshMethodName(): string {
    return 'getAllUsers';
  }

  setTableRefreshService() {
    return this.userService;
  }

  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }
}
