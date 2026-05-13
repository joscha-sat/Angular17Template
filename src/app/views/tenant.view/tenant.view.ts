import { Component, inject } from '@angular/core';
import { TenantHeader } from '../../components/tenant/tenant-header/tenant-header';
import { ViewLayout } from '../../other/layouts/view-layout/view-layout';
import { TenantTable } from '../../components/tenant/tenant-table/tenant-table';
import { TenantStore } from '../../stores/tenant.store';

@Component({
  selector: 'app-tenant.view',
  imports: [TenantHeader, ViewLayout, TenantTable],
  templateUrl: './tenant.view.html',
  styleUrl: './tenant.view.scss',
})
export class TenantView {
  // | services | --------------------------------------------------------------------------  ||
  public readonly tenantStore: InstanceType<typeof TenantStore> = inject(TenantStore);

  // | signals / vars | --------------------------------------------------------------------  ||

  // | init | ------------------------------------------------------------------------------  ||

  // | normal methods | --------------------------------------------------------------------  ||
}
