import { Component } from '@angular/core';
import { LoginForm } from '../../components/login/login-form/login-form';
import { LoginHeader } from '../../components/login/login-header/login-header';

@Component({
  selector: 'app-login',
  imports: [LoginForm, LoginHeader],
  templateUrl: './login.view.html',
  styleUrl: './login.view.scss',
})
export class LoginView {}
