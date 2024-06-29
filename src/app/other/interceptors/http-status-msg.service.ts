import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

const STATUS_CODES: { [key: number]: string } = {
  400: 'generic-http-error.status-400',
  401: 'generic-http-error.status-401',
  403: 'generic-http-error.status-403',
  404: 'generic-http-error.status-404',
  406: 'generic-http-error.status-406',
  409: 'generic-http-error.status-409',
  500: 'generic-http-error.status-500',
};

@Injectable({
  providedIn: 'root',
})
export class HttpStatusMsgService {
  constructor(private injector: Injector) {}

  private get translateService(): TranslateService {
    return this.injector.get(TranslateService);
  }

  // Method to get the appropriate error message for a given HTTP error status
  getStatusErrorMessage = (
    err: HttpErrorResponse,
    method?: string, // Method string (e.g. "GET", "POST")
    endpoint?: string, // e.g. user
  ) => {
    // Extracting the endpoint from error if any
    const endpointFromError = this.getEndpointFromError(err);
    if (endpointFromError) {
      endpoint = endpointFromError;
    }

    // Creating the translation key and genericTranslationKey using the error details
    const errorKey = err.error?.key?.toLowerCase() || '';
    const translationKey = `http-error.${endpoint}.${method?.toLowerCase()}_${errorKey}`;
    const genericTranslationKey = `http-error.${errorKey}`;

    // Translating the key to the actual error message
    let translated = this.translateService.instant(translationKey);
    if (translated === translationKey) {
      translated = this.translateService.instant(genericTranslationKey);
    }

    let message =
      translated !== genericTranslationKey ? translated : err.error.message;

    // If there is no message in the error, we fetch the message from the status code
    if (!message) {
      const statusKey = STATUS_CODES[err.status];
      let statusMessage = statusKey
        ? this.translateService.instant(statusKey)
        : '';
      message =
        statusMessage ?? `Unbekannter Fehler, Statuscode ${err.status}.`;
    }

    return message;
  };

  // Method to extract the endpoint from error
  getEndpointFromError(err: HttpErrorResponse) {
    if (!err.url) return;

    // Extracting the endpoint segments from the URL
    let url = new URL(err.url);
    let segments = url.pathname.split('/').filter((segment) => segment !== '');

    // Parsing the last segment of the endpoint to check if it follows a specific pattern
    let lastSegmentPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return lastSegmentPattern.test(segments[segments.length - 1])
      ? segments[segments.length - 2]
      : segments[segments.length - 1];
  }
}
