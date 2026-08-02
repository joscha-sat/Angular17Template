import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  LOCALE_ID,
  Provider,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './other/interceptors/auth-token.interceptor';
import { isLoadingInterceptor } from './other/interceptors/is-loading.interceptor';
import { errorInterceptor } from './other/interceptors/error.interceptor';
import { mockInterceptor } from './other/interceptors/mock.interceptor';
import {
  MAT_LUXON_DATE_FORMATS,
  provideLuxonDateAdapter,
} from '@angular/material-luxon-adapter';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
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

// Date format configuration constant
const LUXON_DATE_FORMAT_CONFIG: {
  parse: { dateInput: string };
  display: {
    dateInput: string;
    monthYearLabel: string;
    dateA11yLabel: string;
    monthYearA11yLabel: string;
  };
} = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd.MM.yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

function provideLuxonDateAdapterWithLocale(): Provider[] {
  return [
    provideLuxonDateAdapter(LUXON_DATE_FORMAT_CONFIG),
    {
      provide: MAT_LUXON_DATE_FORMATS,
      useValue: LUXON_DATE_FORMAT_CONFIG,
    },
  ];
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    ...provideLuxonDateAdapterWithLocale(),
    provideHttpClient(
      withInterceptors([
        mockInterceptor,
        authTokenInterceptor,
        isLoadingInterceptor,
        errorInterceptor,
      ]),
    ),
    provideRouter(routes),
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
