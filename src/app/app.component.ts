import { TUI_SANITIZER } from '@taiga-ui/legacy';
import { NgDompurifySanitizer } from '@taiga-ui/dompurify';
import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthService } from './api/auth.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRoot,
    TranslateModule,
    NavigationComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent implements OnInit {
  title = 'Angular-Template-V2';
  protected readonly darkMode = inject(TUI_DARK_MODE);
  private authService = inject(AuthService);
  private languageService = inject(LanguageService);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.languageService.initLanguage();
  }
}
