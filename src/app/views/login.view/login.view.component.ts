import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginFormComponent } from '../../components/login/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { LoginHeaderComponent } from '../../components/login/login-header/login-header.component';

@Component({
  selector: 'app-login.view',
  imports: [
    TranslateModule,
    LoginFormComponent,
    MatCardModule,
    LoginHeaderComponent,
  ],
  templateUrl: './login.view.component.html',
  styleUrl: './login.view.component.scss',
})
export class LoginViewComponent {}
