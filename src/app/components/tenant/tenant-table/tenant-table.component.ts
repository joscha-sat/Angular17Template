import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { BaseTableComponent } from '../../../other/abstract-classes/BaseTable';
import { Tenant } from '../../../models/Tenant';
import { Table } from '../../../other/types/Table.type';
import { TenantService } from '../../../api/tenant.service';

@Component({
  selector: 'app-tenant-table',
  imports: [TemplateTableEnterFetchComponent],
  templateUrl: './tenant-table.component.html',
  styleUrl: './tenant-table.component.scss',
})
export class TenantTableComponent
  extends BaseTableComponent<Tenant>
  implements Table<Tenant>, OnInit
{
  tenantService: TenantService = inject(TenantService);

  headers: WritableSignal<string[]> = signal<string[]>([
    'general.name',
    'general.createdAt',
    'general.updatedAt',
  ]);

  columns: WritableSignal<(keyof Tenant)[]> = signal<(keyof Tenant)[]>([
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
