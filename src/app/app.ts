import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './api/auth.service';
import { Navigation } from './components/navigation/navigation';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LoadingService } from './services/loading.service';
import { AsyncPipe } from '@angular/common';
import { SidenavStore } from './stores/sidenav.store';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, ProgressSpinner, AsyncPipe, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly sidenavStore: SidenavStore = inject(SidenavStore);

  title: string = 'Angular-Template-V2';
  public loadingService: LoadingService = inject(LoadingService);
  private readonly authService: AuthService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
