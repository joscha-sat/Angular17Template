import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './api/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';
import { AsyncPipe } from '@angular/common';
import { environment } from './other/environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService: AuthService = inject(AuthService);
  title: string = 'Angular-Template-V2';
  public loadingService: LoadingService = inject(LoadingService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isMockMode(): boolean {
    return environment.mock;
  }
}
