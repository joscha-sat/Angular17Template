import { Component, inject, OnInit, signal } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { Tenant } from "../../../other/models/Tenant";
import { AsyncPipe } from "@angular/common";
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { Router } from "@angular/router";
import { NavRoutes } from "../../../other/enums/nav-routes";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";
import { DeleteIconComponent } from "../../../shared/delete-icon/delete-icon.component";
import { TenantService } from "../../../api/tenant.service";
import { TableRefresherComponent } from "../../../shared/table-refresher/table-refresher.component";

@Component({
  selector: "app-tenant-table",
  standalone: true,
  imports: [
    BaseTableComponent,
    AsyncPipe,
    BaseTableAsyncComponent,
    BaseTuiButtonComponent,
    DeleteIconComponent,
  ],
  templateUrl: "./tenant-table.component.html",
  styleUrl: "./tenant-table.component.scss",
})
export class TenantTableComponent extends TableRefresherComponent<Tenant> implements OnInit {
  headers = signal<string[]>(['Name', "Löschen"]);
  columns = signal<string[]>(['name', "delete"]);
  router = inject(Router);
  tenantService = inject(TenantService);
  
  getService() {
    return this.tenantService;
  }

  getServiceMethodName() {
    return 'getAllTenants';
  }

  // method which get triggered on a table row click
  rowClicked($event: Tenant) {
    this.openTenantDashboard($event);
  }

  // method that navigates to the tenant dashboard via tenant id

  openTenantDashboard(tenant: Tenant) {
    const url = `${ NavRoutes.TENANT }/${ NavRoutes.DASHBOARD }/${ tenant.id }`;
    this.router.navigate([url]).then();
  }

  trashClicked(event: Tenant) {
    const tenant = new Tenant(event)
    this.tenantService.deleteOneTenant(tenant.id).subscribe()
  }


}



