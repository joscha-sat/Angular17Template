import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginHeaderComponent } from '../../components/login/login-header/login-header.component';
import { LoginFormComponent } from '../../components/login/login-form/login-form.component';

@Component({
  selector: 'app-login.view',
  imports: [TranslateModule, LoginHeaderComponent, LoginFormComponent],
  templateUrl: './login.view.component.html',
  styleUrl: './login.view.component.scss',
})
export class LoginViewComponent {}
