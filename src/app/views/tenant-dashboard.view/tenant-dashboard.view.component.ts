import { Component } from "@angular/core";
import { BaseTableComponent } from "../../shared/base-table/base-table.component";

@Component({
  selector: "app-tenant-dashboard.view",
  standalone: true,
  imports: [
    BaseTableComponent,
  ],
  templateUrl: "./tenant-dashboard.view.component.html",
  styleUrl: "./tenant-dashboard.view.component.scss",
})
export class TenantDashboardViewComponent {

}
