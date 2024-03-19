import { Component, inject, OnInit, signal } from "@angular/core";
import { BaseTableComponent } from "../../shared/base-table/base-table.component";
import { BaseBreadcrumbsComponent } from "../../shared/base-breadcrumbs/base-breadcrumbs.component";
import {
  TenantDashboardGridComponent,
} from "../../components/tenant-dashboard/tenant-dashboard-grid/tenant-dashboard-grid.component";
import {
  TenantDashboardAxesComponent,
} from "../../components/tenant-dashboard/tenant-dashboard-axes/tenant-dashboard-axes.component";
import { TranslateModule } from "@ngx-translate/core";
import {
  TenantDashboardHeaderComponent
} from "../../components/tenant-dashboard/tenant-dashboard-header/tenant-dashboard-header.component";
import { ViewLayoutComponent } from "../../other/layouts/view-layout/view-layout.component";
import { ActivatedRoute } from "@angular/router";
import { TenantService } from "../../api/tenant.service";
import { Tenant } from "../../other/models/Tenant";


@Component({
  selector: "app-tenant-dashboard.view",
  standalone: true,
  imports: [
    BaseTableComponent,
    BaseBreadcrumbsComponent,
    TenantDashboardGridComponent,
    TenantDashboardAxesComponent,
    TranslateModule,
    TenantDashboardHeaderComponent,
    ViewLayoutComponent,
  ],
  templateUrl: "./tenant-dashboard.view.component.html",
  styleUrl: "./tenant-dashboard.view.component.scss",
})
export class TenantDashboardViewComponent implements OnInit {
  route = inject(ActivatedRoute)
  tenantService = inject(TenantService)
  tenant = signal<Tenant>(new Tenant({}));

  ngOnInit(): void {
    this.getTenantIdByUrl()
  }

  getTenantIdByUrl() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has("id")) {
        this.getSelectedTenantById(paramMap.get('id')!)
      }
    })
  }

  getSelectedTenantById(id: string) {
    this.tenantService.getOneTenant(id).subscribe((tenant) => {
      this.tenant.set(tenant);
    })
  }
}
