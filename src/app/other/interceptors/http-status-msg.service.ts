import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusMsgService {
  constructor(private injector: Injector) {}

  private get translateService(): TranslateService {
    return this.injector.get(TranslateService);
  }

  getStatusErrorMessage = (
    err: HttpErrorResponse,
    method?: string,
    endpoint?: string,
  ) => {
    if (this.getEndpointFromError(err)) {
      endpoint = this.getEndpointFromError(err);
    }

    const errorKey = err.error?.key?.toLowerCase() || '';
    const translationKey = `http-error.${endpoint}.${method?.toLowerCase()}_${errorKey}`;
    const genericTranslationKey = `http-error.${errorKey}`;

    let translated = this.translateService.instant(translationKey);

    if (translated === translationKey) {
      // If not found for the specific endpoint and method, try the generic key
      translated = this.translateService.instant(genericTranslationKey);
    }

    let message =
      translated !== genericTranslationKey ? translated : err.error.message;

    if (!message) {
      // If no error message is given, get the error message based on status code
      let statusMessage: string = '';
      switch (err.status) {
        case 400:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-400',
          );
          break;
        case 401:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-401',
          );
          break;
        case 403:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-403',
          );
          break;
        case 404:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-404',
          );
          break;
        case 406:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-406',
          );
          break;
        case 409:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-409',
          );
          break;
        case 500:
          statusMessage = this.translateService.instant(
            'generic-http-error.status-500',
          );
          break;
      }
      message =
        statusMessage ?? `Unbekannter Fehler, Statuscode ${err.status}.`;
    }

    return message;
  };

  getEndpointFromError(err: HttpErrorResponse) {
    if (!err.url) return;
    // Create a new URL object
    let url = new URL(err.url);

    // Split the URL's pathname into segments
    let segments = url.pathname.split('/');

    // Remove empty segments due to leading/trailing slashes
    segments = segments.filter((segment) => segment !== '');

    // Check if the last segment is a UUID by using a UUID-specific regex
    let lastSegmentPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return lastSegmentPattern.test(segments[segments.length - 1])
      ? segments[segments.length - 2]
      : segments[segments.length - 1];
  }
}
