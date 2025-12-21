import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './api/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    NavigationComponent,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'Angular-Template-V2';
  public loadingService: LoadingService = inject(LoadingService);
  private readonly authService: AuthService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
