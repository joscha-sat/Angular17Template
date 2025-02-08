import { Component, inject, OnInit, signal } from '@angular/core';
import { Customer } from '../../../other/models/Customer';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { TableRefresherComponent } from '../../../other/abstract-class/refreshBaseTable';
import { CustomerService } from '../../../api/customer.service';

@Component({
  selector: 'app-customer-table',
  imports: [TemplateTableEnterFetchComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent
  extends TableRefresherComponent<Customer>
  implements OnInit
{
  customerService = inject(CustomerService);

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
    console.log($event);
  }
}
