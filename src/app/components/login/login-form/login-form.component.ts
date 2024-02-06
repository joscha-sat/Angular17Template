import { Component, inject } from "@angular/core";
import { BaseInputComponent } from "../../../shared/base-input/base-input.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButtonModule, TuiLinkModule } from "@taiga-ui/core";
import { TranslateModule } from "@ngx-translate/core";
import { AuthService } from "../../../api/auth.service";
import { LoginBody } from "../../../types/LoginBody.type";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [
    BaseInputComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TranslateModule,
    TuiLinkModule,
  ],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  form: FormGroup | undefined;
  isOpen: boolean = false;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],

    });
  }

  get loginBody(): LoginBody {
    return {
      username: this.form?.controls["email"].value,
      password: this.form?.controls["password"].value,
    };
  }

  submit() {
    if (this.form?.invalid) return;

    this.authService.login(this.loginBody).subscribe((res) => {
      console.log("success", res);
    });

  }
}

