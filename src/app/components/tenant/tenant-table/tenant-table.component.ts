import { Component, inject, OnInit } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { TenantService } from "../../../api/tenant.service";
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
export class TenantTableComponent implements OnInit {
  tenantService = inject(TenantService);

  tenants$: Observable<Tenant[]> | undefined;
  tableHeaders = ["Name"];
  tableColumns = ["name"];
  protected readonly Tenant = Tenant;

  getTenants() {
    this.tenants$ = this.tenantService.getTenants();
  }

  ngOnInit(): void {
    this.getTenants();
  }
}
