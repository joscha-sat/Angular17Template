import { Component, inject, signal } from '@angular/core';
import {
  BaseTableAsyncComponent,
  FetchDataFunction
} from "../../../shared/base-table-async/base-table-async.component";
import { BehaviorSubject, switchMap } from "rxjs";
import { CustomerService } from "../../../api/customer.service";
import { Customer } from "../../../other/models/Customer";

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    BaseTableAsyncComponent
  ],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent {
  customerService = inject(CustomerService)

  headers = signal<string[]>(["Vorname"]);
  columns = signal<string[]>(["firstName"]);
  refresh$ = new BehaviorSubject(null);

  fetchCustomersFn: FetchDataFunction<Customer> = (page: number, size: number) => {
    return this.refresh$.pipe(
      switchMap(() =>
        this.customerService.getAllCustomers({ limit: size, skip: page * size })
      )
    );
  };

  refreshDataSubscription() {
    this.customerService.refreshCustomers$.subscribe(() => {
      this.refresh$.next(null);
    });
  }
}
