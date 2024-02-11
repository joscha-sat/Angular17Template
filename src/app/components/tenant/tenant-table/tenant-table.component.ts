import { Component, inject, Input, signal } from "@angular/core";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { Tenant } from "../../../models/Tenant";
import { AsyncPipe } from "@angular/common";
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { NavRoutes } from "../../../enums/nav-routes";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";

@Component({
  selector: "app-tenant-table",
  standalone: true,
  imports: [
    BaseTableComponent,
    AsyncPipe,
    BaseTableAsyncComponent,
    BaseTuiButtonComponent,
  ],
  templateUrl: "./tenant-table.component.html",
  styleUrl: "./tenant-table.component.scss",
})
export class TenantTableComponent {
  @Input({ required: true }) tenants$: Observable<Tenant[]> | undefined;

  router = inject(Router);
  // method that navigates to the tenant dashboard via tenant id
  headers = signal<string[]>(['Name']);
  columns = signal<string[]>(['name']);

  // method which get triggered on a table row click
  rowClicked($event: Tenant) {
    this.openTenantDashboard($event);
  }

  openTenantDashboard(tenant: Tenant) {
    const url = `${ NavRoutes.TENANT }/${ NavRoutes.DASHBOARD }/${ tenant.id }`;
    this.router.navigate([url]).then();
  }
}

