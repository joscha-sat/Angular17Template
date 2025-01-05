import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, LoginBody } from '../../../api/auth.service';
import { Router } from '@angular/router';
import { NavRoutes } from '../../../other/enums/nav-routes';
import { TemplateInputComponent } from '../../../shared/template-input/template-input.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TemplateInputComponent,
    MatButton,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  roter = inject(Router);
  authService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  form = this.fb.group({
    username: ['', { validators: Validators.required, nonNullable: true }],
    password: ['', { validators: Validators.required, nonNullable: true }],
  });

  get loginBody(): LoginBody {
    return <LoginBody>this.form.value;
  }

  submit() {
    if (this.form?.invalid) return;
    this.authService.login(this.loginBody).subscribe(() => {
      this.roter.navigate(['/' + NavRoutes.TENANT]).then();
    });
  }
}
