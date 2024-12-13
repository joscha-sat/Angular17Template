import { Component, inject, OnInit, signal } from '@angular/core';
import { TenantHeaderComponent } from '../../components/tenant/tenant-header/tenant-header.component';
import { TenantService } from '../../api/tenant.service';
import { Tenant } from '../../other/models/Tenant';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';

@Component({
  selector: 'app-tenant.view',
  imports: [TenantHeaderComponent, ViewLayoutComponent],
  templateUrl: './tenant.view.component.html',
  styleUrl: './tenant.view.component.scss',
})
export class TenantViewComponent implements OnInit {
  // | services | --------------------------------------------------------------------------  ||
  tenantService = inject(TenantService);

  // | signals / vars | --------------------------------------------------------------------  ||
  tenants = signal<Tenant[]>([]);

  // | init | ------------------------------------------------------------------------------  ||
  ngOnInit(): void {
    this.getTenants();
  }

  // | normal methods | --------------------------------------------------------------------  ||
  getTenants() {
    this.tenantService.getAllTenants().subscribe((tenants) => {
      this.tenants.set(tenants.records);
    });
  }
}
