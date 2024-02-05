import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-login-header",
  standalone: true,
  imports: [
    TranslateModule,
  ],
  templateUrl: "./login-header.component.html",
  styleUrl: "./login-header.component.scss",
})
export class LoginHeaderComponent {

}
