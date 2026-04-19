import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login-header',
  imports: [TranslocoPipe],
  templateUrl: './login-header.component.html',
  styleUrl: './login-header.component.scss',
})
export class LoginHeaderComponent {}
