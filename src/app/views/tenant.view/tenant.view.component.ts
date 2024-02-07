import { Component, inject, OnInit, signal } from "@angular/core";
import { TenantHeaderComponent } from "../../components/tenant/tenant-header/tenant-header.component";
import { TenantTableComponent } from "../../components/tenant/tenant-table/tenant-table.component";
import { TenantService } from "../../api/tenant.service";
import { Observable, shareReplay } from "rxjs";
import { Tenant } from "../../models/Tenant";

@Component({
  selector: "app-tenant.view",
  standalone: true,
  imports: [
    TenantHeaderComponent,
    TenantTableComponent,
  ],
  templateUrl: "./tenant.view.component.html",
  styleUrl: "./tenant.view.component.scss",
})
export class TenantViewComponent implements OnInit {
  tenantService = inject(TenantService);
  tenants$: Observable<Tenant[]> | undefined;
  tenants = signal<Tenant[]>([]);

  getTenants() {
    this.tenants$ = this.tenantService.getTenants().pipe(shareReplay(1));

    this.tenants$.subscribe(res => {
      this.tenants.set(res);
    });
  }

  ngOnInit(): void {
    this.getTenants();
  }
}
