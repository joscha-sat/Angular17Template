import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './api/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LoadingService } from './services/loading.service';
import { AsyncPipe } from '@angular/common';
import { SidenavStore } from './stores/sidenav.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, ProgressSpinner, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly sidenavStore = inject(SidenavStore);

  title: string = 'Angular-Template-V2';
  public loadingService: LoadingService = inject(LoadingService);
  private readonly authService: AuthService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
