import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login/login-form/login-form.component';
import { CardModule } from 'primeng/card';
import { LoginHeaderComponent } from '../../components/login/login-header/login-header.component';

@Component({
  selector: 'app-login.view',
  imports: [LoginFormComponent, CardModule, LoginHeaderComponent],
  templateUrl: './login.view.component.html',
  styleUrl: './login.view.component.scss',
})
export class LoginViewComponent {}
