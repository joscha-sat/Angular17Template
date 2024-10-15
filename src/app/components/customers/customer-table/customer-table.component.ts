import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseTableComponent } from '../../../shared/base-table/base-table.component';
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
  imports: [BaseTableComponent, TranslateModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent
  extends TableRefresherComponent<Customer>
  implements Table<Customer>, OnInit
{
  customerService = inject(CustomerService);
  dialogService = inject(TuiDialogHelperService);

  headers = signal<string[]>(['general.createdAt', 'general.name']);
  columns = signal<(keyof Customer | 'delete' | 'edit')[]>([
    'createdAt',
    'name',
  ]);

  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }

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
