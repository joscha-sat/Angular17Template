import { Component, inject, signal } from '@angular/core';
import { BaseTableAsyncComponent } from '../../../shared/base-table-async/base-table-async.component';
import { CustomerService } from '../../../api/customer.service';
import { Customer } from '../../../other/models/Customer';
import { TableRefresherComponent } from '../../../other/abstract-class-components/table-refresher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { CustomerAddEditDialogComponent } from '../customer-add-edit-dialog/customer-add-edit-dialog.component';
import { Table } from '../../../other/types/Table.type';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [BaseTableAsyncComponent, TranslateModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent
  extends TableRefresherComponent<Customer>
  implements Table<Customer>
{
  customerService = inject(CustomerService);
  dialogService = inject(TuiDialogHelperService);

  headers = signal<string[]>(['Name']);
  columns = signal<string[]>(['name']);

  setTableRefreshService(): any {
    return this.customerService;
  }

  setTableRefreshMethodName(): string {
    return 'getAllCustomers';
  }

  openEditCustomerDialog($event: Customer) {
    this.dialogService.openDialog(CustomerAddEditDialogComponent, $event);
  }
}
