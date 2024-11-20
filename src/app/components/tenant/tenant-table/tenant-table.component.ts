import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseTableComponent } from '../../../shared/base-table/base-table.component';
import { Tenant } from '../../../other/models/Tenant';
import { Router } from '@angular/router';
import { NavRoutes } from '../../../other/enums/nav-routes';
import { TenantService } from '../../../api/tenant.service';
import { TableRefresherComponent } from '../../../other/abstract-class-components/table-refresher.component';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { Table } from '../../../other/types/Table.type';
import { DeleteIconComponent } from '../../../shared/base-icons/delete-icon/delete-icon.component';
import {
  BaseDeleteDialogComponent,
  DeleteContextData,
} from '../../../shared/base-delete-dialog/base-delete-dialog.component';

@Component({
  selector: 'app-tenant-table',
  imports: [BaseTableComponent, DeleteIconComponent],
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
  columns = signal<(keyof Tenant | 'delete' | 'edit')[]>(['name', 'delete']);

  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
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

  trashClicked(tenant: Tenant) {
    const deleteContextData: DeleteContextData = {
      deleteMethod: 'deleteTenantById',
      model: tenant,
      service: this.tenantService,
    };

    this.dialogService.openDialog(BaseDeleteDialogComponent, deleteContextData);
  }
}
