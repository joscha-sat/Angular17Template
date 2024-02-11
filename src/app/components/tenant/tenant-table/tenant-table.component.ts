import { Component, inject, Input, signal } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { Tenant } from "../../../models/Tenant";
import { AsyncPipe } from "@angular/common";
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { NavRoutes } from "../../../enums/nav-routes";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";
import { DeleteIconComponent } from "../../../shared/delete-icon/delete-icon.component";

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
export class TenantTableComponent {
  @Input({ required: true }) tenants$: Observable<Tenant[]> | undefined;
  headers = signal<string[]>(['Name']);
  columns = signal<string[]>(['name']);

  router = inject(Router);
  protected readonly Tenant = Tenant;

  // method which get triggered on a table row click
  rowClicked($event: Tenant) {
    this.openTenantDashboard($event);
  }

  // method that navigates to the tenant dashboard via tenant id
  openTenantDashboard(tenant: Tenant) {
    const url = `${ NavRoutes.TENANT }/${ NavRoutes.DASHBOARD }/${ tenant.id }`;
    this.router.navigate([url]).then();
  }
}

