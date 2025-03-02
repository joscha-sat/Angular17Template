import { Component, inject, OnInit, signal } from '@angular/core';
import { Customer } from '../../../other/models/Customer';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { BaseTableComponent } from '../../../other/abstract-class/refreshBaseTable';
import { CustomerService } from '../../../api/customer.service';
import { DeleteIconComponent } from '../../../shared/icons/delete-icon/delete-icon.component';

@Component({
  selector: 'app-customer-table',
  imports: [TemplateTableEnterFetchComponent, DeleteIconComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent
  extends BaseTableComponent<Customer>
  implements OnInit
{
  customerService = inject(CustomerService);
  headers = signal<string[]>(['general.createdAt', 'general.name', '']);
  columns = signal<(keyof Customer | 'delete' | 'edit')[]>([
    'createdAt',
    'name',
    'delete',
  ]);

  deleteCustomer(id: string) {
    this.customerService.deleteCustomerById(id).subscribe();
  }

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
