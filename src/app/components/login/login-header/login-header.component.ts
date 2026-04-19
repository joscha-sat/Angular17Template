import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login-header',
  imports: [CardModule, TranslocoPipe],
  templateUrl: './login-header.component.html',
  styleUrl: './login-header.component.scss',
})
export class LoginHeaderComponent {}
