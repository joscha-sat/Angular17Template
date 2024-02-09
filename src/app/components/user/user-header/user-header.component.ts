import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";
import { HeaderLayoutComponent } from "../../../layouts/header-layout/header-layout.component";
import { EditIconComponent } from "../../../shared/edit-icon/edit-icon.component";

@Component({
  selector: "app-user-header",
  standalone: true,
  imports: [
    TranslateModule,
    BaseTuiButtonComponent,
    HeaderLayoutComponent,
    EditIconComponent,
  ],
  templateUrl: "./user-header.component.html",
  styleUrl: "./user-header.component.scss",
})
export class UserHeaderComponent {

}
