import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseTableComponent } from '../../../shared/base-table/base-table.component';
import { Tenant } from '../../../other/models/Tenant';
import { AsyncPipe } from '@angular/common';
import { BaseTableAsyncComponent } from '../../../shared/base-table-async/base-table-async.component';
import { Router } from '@angular/router';
import { NavRoutes } from '../../../other/enums/nav-routes';
import { BaseTuiButtonComponent } from '../../../shared/base-tui-button/base-tui-button.component';
import { TenantService } from '../../../api/tenant.service';
import { TableRefresherComponent } from '../../../other/abstract-class-components/table-refresher.component';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { TenantDeleteDialogComponent } from '../tenant-delete-dialog/tenant-delete-dialog.component';
import { Table } from '../../../other/types/Table.type';
import { DeleteIconComponent } from '../../../shared/base-icons/delete-icon/delete-icon.component';

@Component({
  selector: 'app-tenant-table',
  standalone: true,
  imports: [
    BaseTableComponent,
    AsyncPipe,
    BaseTableAsyncComponent,
    BaseTuiButtonComponent,
    DeleteIconComponent,
  ],
  templateUrl: './tenant-table.component.html',
  styleUrl: './tenant-table.component.scss',
})
export class TenantTableComponent
  extends TableRefresherComponent<Tenant>
  implements OnInit, Table<Tenant>
{
  router = inject(Router);
  tenantService = inject(TenantService);
  dialogService = inject(TuiDialogHelperService);

  headers = signal<string[]>(['general.name', 'general.delete']);
  columns = signal<string[]>(['name', 'delete']);

  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
    console.log(this.sum(5, 10));
  }

  setTableRefreshService() {
    return this.tenantService;
  }

  setTableRefreshMethodName() {
    return 'getAllTenants';
  }

  // method which get triggered on a table row click
  rowClicked($event: Tenant) {
    this.openTenantDashboard($event);
  }

  // method that navigates to the tenant dashboard via tenant id
  openTenantDashboard(tenant: Tenant) {
    const url = `${NavRoutes.TENANT}/${NavRoutes.DASHBOARD}/${tenant.id}`;
    this.router.navigate([url]).then();
  }

  trashClicked(event: Tenant) {
    const tenant = new Tenant(event);
    this.dialogService.openDialog(TenantDeleteDialogComponent, tenant.id);
  }

  sum(x: number, y: number) {
    debugger;
    return x + y;
  }
}
