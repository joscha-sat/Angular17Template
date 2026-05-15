import { Component, inject, type OnInit } from '@angular/core';
import { type Observable } from 'rxjs';
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
export class TenantTable extends SignalStoreTable<Tenant> implements OnInit {
  private readonly tenantStore: InstanceType<typeof TenantStore> = inject(TenantStore);
  protected readonly tenantService: TenantService = inject(TenantService);

  protected override tableDataSource: TableDataSource<Tenant> = {
    entities: this.tenantStore.entities,
    totalCount: this.tenantStore.totalCount,
    loading: this.tenantStore.loading,
    sendLoadRequest: (parameters: unknown) =>
      this.tenantStore.getAllTenants(parameters as TenantQueryParams | undefined),
  };
  protected override onDataChanged$: Observable<unknown> = this.tenantService.refreshObservable$;
  protected override readonly columnConfig: TableColumnConfig = COLUMN_CONFIG;

  override ngOnInit(): void {
    super.ngOnInit();
    this.translateHeaders(this.headers);
  }
}
