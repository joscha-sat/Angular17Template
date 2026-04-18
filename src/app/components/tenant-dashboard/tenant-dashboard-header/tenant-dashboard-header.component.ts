import { Component, input, InputSignal } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { Tenant } from '../../../models/Tenant';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tenant-dashboard-header',
  imports: [HeaderLayoutComponent, TranslocoPipe],
  templateUrl: './tenant-dashboard-header.component.html',
  styleUrl: './tenant-dashboard-header.component.scss',
})
export class TenantDashboardHeaderComponent {
  readonly tenant: InputSignal<Tenant> = input.required<Tenant>();
}
