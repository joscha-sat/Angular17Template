import { Component } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login-header',
  imports: [MatCardTitle, TranslocoPipe],
  templateUrl: './login-header.component.html',
  styleUrl: './login-header.component.scss',
})
export class LoginHeaderComponent {}
