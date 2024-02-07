import { Component, inject, OnInit } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { TenantService } from "../../../api/tenant.service";
import { Tenant } from "../../../models/Tenant";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-tenant-table",
  standalone: true,
  imports: [
    BaseTableComponent,
    AsyncPipe,
  ],
  templateUrl: "./tenant-table.component.html",
  styleUrl: "./tenant-table.component.scss",
})
export class TenantTableComponent implements OnInit {
  tenantService = inject(TenantService);

  tenants: Tenant[] = [];
  tableHeaders = ["Name"];
  tableColumns = ["name"];
  protected readonly Tenant = Tenant;

  getTenants() {
    this.tenantService.getTenants().subscribe(res => {
      this.tenants = res;

      console.log(this.tenants);
    });
  }

  ngOnInit(): void {
    this.getTenants();
  }
}
