import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './other/interceptors/auth-token.interceptor';
import { isLoadingInterceptor } from './other/interceptors/is-loading.interceptor';
import { errorInterceptor } from './other/interceptors/error.interceptor';
import {
  MAT_LUXON_DATE_FORMATS,
  provideLuxonDateAdapter,
} from '@angular/material-luxon-adapter';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

// Register German locale data for DatePipe
registerLocaleData(localeDE);

// Translation configuration constants
const DEFAULT_LANGUAGE = 'de';

// Date format configuration constant
const LUXON_DATE_FORMAT_CONFIG = {
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

function provideLuxonDateAdapterWithLocale() {
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
    provideAnimations(),
    ...provideLuxonDateAdapterWithLocale(),
    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,
        isLoadingInterceptor,
        errorInterceptor,
      ]),
    ),
    provideRouter(routes),

    // NGX-Translate using provider-based API
    provideTranslateService({
      lang: DEFAULT_LANGUAGE,
      fallbackLang: DEFAULT_LANGUAGE,
      loader: provideTranslateHttpLoader({
        // Adjusted to typical Angular assets path
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
