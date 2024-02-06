import { Component, inject, OnInit } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { TenantService } from "../../../api/tenant.service";

@Component({
  selector: "app-tenant-table",
  standalone: true,
  imports: [
    BaseTableComponent,
  ],
  templateUrl: "./tenant-table.component.html",
  styleUrl: "./tenant-table.component.scss",
})
export class TenantTableComponent implements OnInit {
  tenantService = inject(TenantService);


  getTenants() {
    this.tenantService.getTenants().subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.getTenants();
  }
}
