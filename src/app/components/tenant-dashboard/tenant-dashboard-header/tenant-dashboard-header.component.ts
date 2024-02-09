import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { HeaderLayoutComponent } from "../../../layouts/header-layout/header-layout.component";

@Component({
  selector: 'app-tenant-dashboard-header',
  standalone: true,
  imports: [
    TranslateModule,
    HeaderLayoutComponent
  ],
  templateUrl: './tenant-dashboard-header.component.html',
  styleUrl: './tenant-dashboard-header.component.scss'
})
export class TenantDashboardHeaderComponent {

}
