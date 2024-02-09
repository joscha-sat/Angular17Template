import { Component } from "@angular/core";
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
import { ViewLayoutComponent } from "../../layouts/view-layout/view-layout.component";

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
export class TenantDashboardViewComponent {
}
