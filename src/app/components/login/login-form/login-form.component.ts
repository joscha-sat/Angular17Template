import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, LoginBody } from '../../../api/auth.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../other/enums/ROUTES';
import { TemplateInputComponent } from '../../../shared/template-input/template-input.component';
import { MatButton } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TemplateInputComponent,
    MatButton,
    TranslocoPipe,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    username: ['', { validators: Validators.required, nonNullable: true }],
    password: ['', { validators: Validators.required, nonNullable: true }],
  });

  get loginBody(): LoginBody {
    return <LoginBody>this.form.value;
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.loginBody).subscribe(() => {
      this.router.navigate([`/${ROUTES.TENANT}`]).then();
    });
  }
}
