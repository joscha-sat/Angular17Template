import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

// A mapping of HTTP status codes to translation keys
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

  // Lazy retrieves the TranslateService instance
  private get translateService(): TranslateService {
    return this.injector.get(TranslateService);
  }

  /**
   * Method to get the appropriate error message for a given HTTP error status
   * @param err - The HttpErrorResponse object
   * @param method - Optional: The HTTP method (e.g., "GET", "POST")
   * @param endpoint - Optional: Specific endpoint (e.g., "user")
   * @returns The translated error message
   */
  getStatusErrorMessage = (
    err: HttpErrorResponse,
    method?: string,
    endpoint?: string,
  ) => {
    // Extract the endpoint from error if available
    const endpointFromError = this.getEndpointFromError(err);
    if (endpointFromError) {
      endpoint = endpointFromError;
    }

    // Creating translation keys
    const errorKey = err.error?.key?.toLowerCase() || '';
    const translationKey = `http-error.${endpoint}.${method?.toLowerCase()}_${errorKey}`;
    const genericTranslationKey = `http-error.${errorKey}`;

    // Attempt to translate the specific error message
    let translated = this.translateService.instant(translationKey);
    if (translated === translationKey) {
      translated = this.translateService.instant(genericTranslationKey);
    }

    // Fallback to error message from the response if translation is not found
    let message =
      translated !== genericTranslationKey ? translated : err.error.message;

    // If no message is found, get the message from the status code
    if (!message) {
      const statusKey = STATUS_CODES[err.status];
      let statusMessage = statusKey
        ? this.translateService.instant(statusKey)
        : '';
      message = statusMessage ?? `Unknown error, status code ${err.status}.`;
    }

    return message;
  };

  /**
   * Method to extract the endpoint from the error URL
   * @param err - The HttpErrorResponse object
   * @returns The extracted endpoint as a string
   */
  getEndpointFromError(err: HttpErrorResponse): string | undefined {
    if (!err.url) return;

    // Extracting the endpoint segments from the URL
    let url = new URL(err.url);
    let segments = url.pathname.split('/').filter((segment) => segment !== '');

    // Check if the last segment matches a UUID pattern
    let lastSegmentPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return lastSegmentPattern.test(segments[segments.length - 1])
      ? segments[segments.length - 2]
      : segments[segments.length - 1];
  }
}
