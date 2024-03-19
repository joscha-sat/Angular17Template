import { Component, inject, OnInit, signal } from "@angular/core";
import { TenantHeaderComponent } from "../../components/tenant/tenant-header/tenant-header.component";
import { TenantTableComponent } from "../../components/tenant/tenant-table/tenant-table.component";
import { TenantService } from "../../api/tenant.service";
import { Tenant } from "../../other/models/Tenant";
import { AsyncPipe } from "@angular/common";
import { toObservable } from "@angular/core/rxjs-interop";
import { ViewLayoutComponent } from "../../other/layouts/view-layout/view-layout.component";
import { FetchDataFunction } from "../../shared/base-table-async/base-table-async.component";


@Component({
  selector: "app-tenant.view",
  standalone: true,
  imports: [
    TenantHeaderComponent,
    TenantTableComponent,
    AsyncPipe,
    ViewLayoutComponent,
  ],
  templateUrl: "./tenant.view.component.html",
  styleUrl: "./tenant.view.component.scss",
})
export class TenantViewComponent implements OnInit {
  // | services | --------------------------------------------------------------------------  ||
  tenantService = inject(TenantService);

  // | signals / vars | --------------------------------------------------------------------  ||
  tenants = signal<Tenant[]>([]);
  tenants$ = toObservable(this.tenants);

  // | init | ------------------------------------------------------------------------------  ||
  ngOnInit(): void {
    this.getTenants();
    this.refreshDataSubscription();
  }

  // | normal methods | --------------------------------------------------------------------  ||
  getTenants() {
    this.tenantService.getAllTenants({ limit: 5 }).subscribe((tenants) => {
      this.tenants.set(tenants.records);
    });
  }

  fetchTenantsFn: FetchDataFunction<Tenant> = (page: number, size: number) => {
    return this.tenantService.getAllTenants({ limit: size, skip: page * size });
  }

  refreshDataSubscription() {
    this.tenantService.refreshTenants$.subscribe(() => {
      this.getTenants();
    });
  }
}
