import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { authTokenInterceptor } from "./other/interceptors/auth-token.interceptor";
import { isLoadingInterceptor } from "./other/interceptors/is-loading.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authTokenInterceptor, isLoadingInterceptor])),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule, TuiAlertModule, TuiDialogModule),
    TranslateModule.forRoot({
      defaultLanguage: "de",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!
  ],
};

