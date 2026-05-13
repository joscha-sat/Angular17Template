import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login/login-form/login-form';
import { CardModule } from 'primeng/card';
import { LoginHeaderComponent } from '../../components/login/login-header/login-header';

@Component({
  selector: 'app-login.view',
  imports: [LoginFormComponent, CardModule, LoginHeaderComponent],
  templateUrl: './login.view.html',
  styleUrl: './login.view.scss',
})
export class LoginViewComponent {}
