import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './other/interceptors/auth-token.interceptor';
import { isLoadingInterceptor } from './other/interceptors/is-loading.interceptor';
import { errorInterceptor } from './other/interceptors/error.interceptor';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

// Register German locale data for DatePipe
registerLocaleData(localeDE);

// Translation configuration constants
const DEFAULT_LANGUAGE: string = 'de';

// Initialize Transloco with default language
export function initializeTransloco(
  translocoService: TranslocoService,
): () => Promise<unknown> {
  return () => {
    translocoService.setActiveLang(DEFAULT_LANGUAGE);
    return firstValueFrom(translocoService.load(DEFAULT_LANGUAGE));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    provideAnimations(),
    { provide: MessageService },
    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,
        isLoadingInterceptor,
        errorInterceptor,
      ]),
    ),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'de'],
        defaultLang: 'de',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [TranslocoService],
      useFactory: initializeTransloco,
    },
  ],
};
