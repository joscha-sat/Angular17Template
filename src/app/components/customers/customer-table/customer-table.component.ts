import { Component, inject, signal } from '@angular/core';
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { CustomerService } from "../../../api/customer.service";
import { Customer } from "../../../other/models/Customer";
import { TableRefresherComponent } from "../../../shared/table-refresher/table-refresher.component";

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    BaseTableAsyncComponent
  ],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent extends TableRefresherComponent<Customer> {
  customerService = inject(CustomerService)

  headers = signal<string[]>(["Vorname"]);
  columns = signal<string[]>(["firstName"]);

  getService(): any {
    return this.customerService
  }

  getServiceMethodName(): string {
    return "getAllCustomers";
  }

}
