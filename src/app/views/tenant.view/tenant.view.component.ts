import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { TenantHeaderComponent } from '../../components/tenant/tenant-header/tenant-header.component';
import { TenantService } from '../../api/tenant.service';
import { Tenant } from '../../models/Tenant';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { TenantTableComponent } from '../../components/tenant/tenant-table/tenant-table.component';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';

@Component({
  selector: 'app-tenant.view',
  imports: [TenantHeaderComponent, ViewLayoutComponent, TenantTableComponent],
  templateUrl: './tenant.view.component.html',
  styleUrl: './tenant.view.component.scss',
})
export class TenantViewComponent implements OnInit {
  // | services | --------------------------------------------------------------------------  ||
  tenantService: TenantService = inject(TenantService);

  // | signals / vars | --------------------------------------------------------------------  ||
  tenants: WritableSignal<Tenant[]> = signal<Tenant[]>([]);

  // | init | ------------------------------------------------------------------------------  ||
  ngOnInit(): void {
    this.getTenants();
  }

  // | normal methods | --------------------------------------------------------------------  ||
  getTenants(): void {
    this.tenantService
      .getAllTenants()
      .subscribe((tenants: ResponseWithRecords<Tenant>) => {
        this.tenants.set(tenants.records);
      });
  }
}
