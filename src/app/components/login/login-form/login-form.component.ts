import { Component, inject } from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, type LoginBody } from '../../../api/auth.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../other/enums/ROUTES';
import { TemplateInputComponent } from '../../../shared/template-input/template-input.component';
import { MatButton } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';
import { from, switchMap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule, TemplateInputComponent, MatButton, TranslocoPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
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

    this.authService
      .login(this.loginBody)
      .pipe(switchMap(() => from(this.router.navigate([`/${ROUTES.TENANT}`]))))
      .subscribe();
  }
}
