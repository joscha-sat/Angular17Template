import { Component, Input, signal } from '@angular/core';
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { Observable } from "rxjs";
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
  @Input({ required: true }) customers$: Observable<Customer[]> | undefined;

  headers = signal<string[]>(["Vorname"]);
  columns = signal<string[]>(["firstName"]);
}
