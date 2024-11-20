import { Component, inject, signal } from '@angular/core';
import { BaseInputComponent } from '../../../shared/base-input/base-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiButton, TuiLink } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, LoginBody } from '../../../api/auth.service';
import { Router } from '@angular/router';
import { NavRoutes } from '../../../other/enums/nav-routes';

@Component({
  selector: 'app-login-form',
  imports: [
    BaseInputComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiButton,
    TranslateModule,
    TuiLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  form: FormGroup | undefined;
  isOpen = signal<boolean>(false);
  roter = inject(Router);
  authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get loginBody(): LoginBody {
    return {
      username: this.form?.controls['username'].value,
      password: this.form?.controls['password'].value,
    };
  }

  submit() {
    if (this.form?.invalid) return;
    this.authService.login(this.loginBody).subscribe(() => {
      this.roter.navigate(['/' + NavRoutes.TENANT]).then();
    });
  }
}
