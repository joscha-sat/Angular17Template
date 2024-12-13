import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-login-header',
  imports: [TranslateModule, MatCardTitle],
  templateUrl: './login-header.component.html',
  styleUrl: './login-header.component.scss',
})
export class LoginHeaderComponent {}
