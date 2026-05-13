import { Component, inject } from '@angular/core';
import { TenantHeaderComponent } from '../../components/tenant/tenant-header/tenant-header';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout';
import { TenantTableComponent } from '../../components/tenant/tenant-table/tenant-table';
import { TenantStore } from '../../stores/tenant.store';

@Component({
  selector: 'app-tenant.view',
  imports: [TenantHeaderComponent, ViewLayoutComponent, TenantTableComponent],
  templateUrl: './tenant.view.html',
  styleUrl: './tenant.view.scss',
})
export class TenantViewComponent {
  // | services | --------------------------------------------------------------------------  ||
  public readonly tenantStore: InstanceType<typeof TenantStore> = inject(TenantStore);

  // | signals / vars | --------------------------------------------------------------------  ||

  // | init | ------------------------------------------------------------------------------  ||

  // | normal methods | --------------------------------------------------------------------  ||
}
