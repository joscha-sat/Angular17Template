import { Component, inject } from '@angular/core';
import { UserHeaderComponent } from "../../components/user/user-header/user-header.component";
import { UserTableComponent } from "../../components/user/user-table/user-table.component";
import { ViewLayoutComponent } from "../../other/layouts/view-layout/view-layout.component";
import { CustomersHeaderComponent } from "../../components/customers/customers-header/customers-header.component";
import { CustomerTableComponent } from "../../components/customers/customer-table/customer-table.component";
import { Observable } from "rxjs";
import { Customer } from "../../other/models/Customer";
import { CustomerService } from "../../api/customer.service";

@Component({
  selector: 'app-customers.view',
  standalone: true,
  imports: [
    UserHeaderComponent,
    UserTableComponent,
    ViewLayoutComponent,
    CustomersHeaderComponent,
    CustomerTableComponent
  ],
  templateUrl: './customers.view.component.html',
  styleUrl: './customers.view.component.scss'
})
export class CustomersViewComponent {
  customerService = inject(CustomerService)
  customers$: Observable<Customer[]> | undefined;
}
