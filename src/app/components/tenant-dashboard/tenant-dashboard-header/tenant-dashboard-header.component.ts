import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { Tenant } from '../../../other/models/Tenant';

@Component({
  selector: 'app-tenant-dashboard-header',
  imports: [TranslateModule, HeaderLayoutComponent],
  templateUrl: './tenant-dashboard-header.component.html',
  styleUrl: './tenant-dashboard-header.component.scss',
})
export class TenantDashboardHeaderComponent {
  tenant = input.required<Tenant>();
}
