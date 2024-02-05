import { Component } from "@angular/core";
import { BaseInputComponent } from "../../../shared/base-input/base-input.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButtonModule, TuiLinkModule } from "@taiga-ui/core";
import { TranslateModule } from "@ngx-translate/core";

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],

    });
  }

  submit() {
    return false;
  }
}
