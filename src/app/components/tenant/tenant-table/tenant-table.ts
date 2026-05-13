import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TemplateTableEnterFetch } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { BaseTable } from '../../../other/abstract-classes/BaseTable';
import { Tenant } from '../../../models/Tenant';
import { Table } from '../../../other/types/Table.type';
import { TenantService } from '../../../api/tenant.service';

@Component({
  selector: 'app-tenant-table',
  imports: [TemplateTableEnterFetch],
  templateUrl: './tenant-table.html',
  styleUrl: './tenant-table.scss',
})
export class TenantTable extends BaseTable<Tenant> implements Table<Tenant>, OnInit {
  tenantService: TenantService = inject(TenantService);

  readonly headers: WritableSignal<string[]> = signal<string[]>([
    'general.name',
    'general.createdAt',
    'general.updatedAt',
  ]);

  readonly columns: WritableSignal<(keyof Tenant)[]> = signal<(keyof Tenant)[]>([
    'name',
    'createdAt',
    'updatedAt',
  ]);

  override ngOnInit(): void {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }

  setTableRefreshService(): TenantService {
    return this.tenantService;
  }

  setTableRefreshMethodName(): string {
    return 'getAllTenants';
  }
}
