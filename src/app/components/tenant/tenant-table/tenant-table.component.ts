import { Component, Input, signal } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { Tenant } from "../../../models/Tenant";
import { AsyncPipe } from "@angular/common";
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { Observable } from "rxjs";

@Component({
  selector: "app-tenant-table",
  standalone: true,
  imports: [
    BaseTableComponent,
    AsyncPipe,
    BaseTableAsyncComponent,
  ],
  templateUrl: "./tenant-table.component.html",
  styleUrl: "./tenant-table.component.scss",
})
export class TenantTableComponent {
  @Input({ required: true }) tenants$: Observable<Tenant[]> | undefined;
  tableHeaders = signal(["Name"]);
  tableColumns = signal(["name"]);
}
