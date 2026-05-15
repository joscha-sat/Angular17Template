import { Component, inject, OnInit, signal, type WritableSignal } from '@angular/core';
import { type Observable } from 'rxjs';
import { SignalStoreTable } from '../../../other/abstract-classes/SignalStoreTable';
import {
  type TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { type TenantQueryParams, TenantService } from '../../../api/tenant.service';
import { type Tenant } from '../../../models/Tenant';
import { TenantStore } from '../../../stores/tenant.store';

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

  override readonly headers: WritableSignal<string[]> = signal<string[]>([
    'general.name',
    'general.createdAt',
    'general.updatedAt',
  ]);

  override readonly columns: WritableSignal<string[]> = signal<string[]>(['name', 'createdAt', 'updatedAt']);

  override ngOnInit(): void {
    super.ngOnInit();
    this.translateHeaders(this.headers);
  }
}
