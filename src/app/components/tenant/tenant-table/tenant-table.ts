import { Component, inject } from '@angular/core';
import { SignalStoreTable, type TableColumnConfig } from '../../../other/abstract-classes/SignalStoreTable';
import {
  type TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { type TenantQueryParams, TenantService } from '../../../api/tenant.service';
import { type Tenant } from '../../../models/Tenant';
import { TenantStore } from '../../../stores/tenant.store';

const COLUMN_CONFIG: TableColumnConfig = {
  displayedColumns: ['name', 'createdAt', 'updatedAt'],
  headers: ['general.name', 'general.createdAt', 'general.updatedAt'],
};

@Component({
  selector: 'app-tenant-table',
  imports: [TemplateTableEnterFetch],
  templateUrl: './tenant-table.html',
  styleUrl: './tenant-table.scss',
})
export class TenantTable extends SignalStoreTable<Tenant> {
  private readonly tenantStore: InstanceType<typeof TenantStore> = inject(TenantStore);

  protected override readonly service: TenantService = inject(TenantService);
  protected override readonly columnConfig: TableColumnConfig = COLUMN_CONFIG;
  protected override readonly tableDataSource: TableDataSource<Tenant> = this.createTableDataSource(
    this.tenantStore,
    (parameters: unknown) => this.tenantStore.getAllTenants(parameters as TenantQueryParams | undefined),
  );
}
