import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login-header',
  imports: [TranslocoPipe],
  templateUrl: './login-header.html',
  styleUrl: './login-header.scss',
})
export class LoginHeader {}
