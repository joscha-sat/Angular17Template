import { Component, inject, type OnInit, signal, type WritableSignal } from '@angular/core';
import { TenantDashboardGridComponent } from '../../components/tenant-dashboard/tenant-dashboard-grid/tenant-dashboard-grid.component';
import { TenantDashboardHeaderComponent } from '../../components/tenant-dashboard/tenant-dashboard-header/tenant-dashboard-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { ActivatedRoute, type ParamMap } from '@angular/router';
import { TenantService } from '../../api/tenant.service';
import { Tenant } from '../../models/Tenant';

@Component({
  selector: 'app-tenant-dashboard.view',
  imports: [TenantDashboardGridComponent, TenantDashboardHeaderComponent, ViewLayoutComponent],
  templateUrl: './tenant-dashboard.view.component.html',
  styleUrl: './tenant-dashboard.view.component.scss',
})
export class TenantDashboardViewComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  tenantService: TenantService = inject(TenantService);
  readonly tenant: WritableSignal<Tenant> = signal<Tenant>(new Tenant({}));

  ngOnInit(): void {
    this.getTenantIdByUrl();
  }

  getTenantIdByUrl(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id: string | null = paramMap.get('id');
      if (id) {
        this.getSelectedTenantById(id);
      }
    });
  }

  getSelectedTenantById(id: string): void {
    this.tenantService.getTenantById(id).subscribe((tenant: Tenant) => {
      this.tenant.set(tenant);
    });
  }
}
