import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './api/auth.service';
import { MatButton } from '@angular/material/button';
import { ThemingService } from './services/theming.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular-Template-V2';
  private readonly themeService = inject(ThemingService);
  private authService = inject(AuthService);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  changeTheme() {
    this.themeService.toggleTheme();
  }
}
