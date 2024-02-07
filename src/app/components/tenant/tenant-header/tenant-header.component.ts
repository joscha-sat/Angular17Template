import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { Tenant } from "../../../models/Tenant";

@Component({
  selector: "app-tenant-header",
  standalone: true,
  imports: [
    TranslateModule,
    TuiButtonModule,
  ],
  templateUrl: "./tenant-header.component.html",
  styleUrl: "./tenant-header.component.scss",
})
export class TenantHeaderComponent {
  @Input() tenants: Tenant[] = [];
}
