import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular-Template-V2';

  private authService = inject(AuthService);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
