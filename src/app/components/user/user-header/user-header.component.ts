import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-user-header",
  standalone: true,
  imports: [
    TranslateModule,
  ],
  templateUrl: "./user-header.component.html",
  styleUrl: "./user-header.component.scss",
})
export class UserHeaderComponent {

}
