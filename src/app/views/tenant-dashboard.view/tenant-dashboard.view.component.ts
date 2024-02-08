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

@Component({
  selector: "app-tenant-dashboard.view",
  standalone: true,
  imports: [
    BaseTableComponent,
    BaseBreadcrumbsComponent,
    TenantDashboardGridComponent,
    TenantDashboardAxesComponent,
    TranslateModule,
  ],
  templateUrl: "./tenant-dashboard.view.component.html",
  styleUrl: "./tenant-dashboard.view.component.scss",
})
export class TenantDashboardViewComponent {
}
