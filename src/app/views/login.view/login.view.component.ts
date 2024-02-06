import { Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TuiIslandModule } from "@taiga-ui/kit";
import { LoginHeaderComponent } from "../../components/login/login-header/login-header.component";
import { LoginFormComponent } from "../../components/login/login-form/login-form.component";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiSnackbarService } from "../../services/tui-snackbar.service";

@Component({
  selector: "app-login.view",
  standalone: true,
  imports: [TranslateModule, TuiIslandModule, LoginHeaderComponent, LoginFormComponent, TuiButtonModule],
  templateUrl: "./login.view.component.html",
  styleUrl: "./login.view.component.scss",
})
export class LoginViewComponent {

  snackbarService = inject(TuiSnackbarService);

  openSnackbar() {
    this.snackbarService.openSnackbar("success", "title", "content");
  }
}
