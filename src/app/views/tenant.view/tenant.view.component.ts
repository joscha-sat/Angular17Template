import { Component } from "@angular/core";
import { TenantHeaderComponent } from "../../components/tenant/tenant-header/tenant-header.component";
import { TenantTableComponent } from "../../components/tenant/tenant-table/tenant-table.component";

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
export class TenantViewComponent {

}
