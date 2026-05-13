import { Component, inject } from '@angular/core';
import { TenantHeaderComponent } from '../../components/tenant/tenant-header/tenant-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { TenantTableComponent } from '../../components/tenant/tenant-table/tenant-table.component';
import { TenantStore } from '../../stores/tenant.store';

@Component({
  selector: 'app-tenant.view',
  imports: [TenantHeaderComponent, ViewLayoutComponent, TenantTableComponent],
  templateUrl: './tenant.view.component.html',
  styleUrl: './tenant.view.component.scss',
})
export class TenantViewComponent {
  // | services | --------------------------------------------------------------------------  ||
  public readonly tenantStore: InstanceType<typeof TenantStore> = inject(TenantStore);

  // | signals / vars | --------------------------------------------------------------------  ||

  // | init | ------------------------------------------------------------------------------  ||

  // | normal methods | --------------------------------------------------------------------  ||
}
