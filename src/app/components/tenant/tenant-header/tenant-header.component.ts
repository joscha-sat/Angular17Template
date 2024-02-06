import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TuiButtonModule } from "@taiga-ui/core";

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

}
