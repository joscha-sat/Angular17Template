import { inject, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiRoutes } from '../../other/enums/api_routes';

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
  private readonly injector = inject(Injector);

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
    endpoint?: ApiRoutes | string,
  ): string => {
    const resolvedEndpoint = this.resolveEndpoint(err, endpoint);
    const errorKey = err.error?.key?.toLowerCase() || '';

    return (
      this.getTranslatedMessage(resolvedEndpoint, method, errorKey) ||
      this.getErrorMessage(err) ||
      this.getStatusMessage(err)
    );
  };

  /**
   * Method to extract the endpoint from the error URL
   * @param err - The HttpErrorResponse object
   * @returns The extracted endpoint as a string
   */
  getEndpointFromError(err: HttpErrorResponse): string | undefined {
    if (!err.url) return undefined;

    // Extracting the endpoint segments from the URL
    const url = new URL(err.url);
    const segments = url.pathname
      .split('/')
      .filter((segment) => segment !== '');

    // Check if the last segment matches a UUID pattern
    const lastSegmentPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return lastSegmentPattern.test(segments[segments.length - 1])
      ? segments[segments.length - 2]
      : segments[segments.length - 1];
  }

  private resolveEndpoint(
    err: HttpErrorResponse,
    endpoint?: ApiRoutes | string,
  ): ApiRoutes | string | undefined {
    const endpointFromError = this.getEndpointFromError(err);
    return endpointFromError || endpoint;
  }

  private getTranslatedMessage(
    endpoint: ApiRoutes | string | undefined,
    method?: string,
    errorKey?: string,
  ): string | null {
    if (!errorKey) return null;

    const translationKey = `http-error.${endpoint}.${method?.toLowerCase()}_${errorKey}`;
    const genericTranslationKey = `http-error.${errorKey}`;

    let translated = this.translateService.instant(translationKey);
    if (translated === translationKey) {
      translated = this.translateService.instant(genericTranslationKey);
    }

    return translated !== genericTranslationKey ? translated : null;
  }

  private getErrorMessage(err: HttpErrorResponse): string | null {
    return err.error?.message || null;
  }

  private getStatusMessage(err: HttpErrorResponse): string {
    const statusKey = STATUS_CODES[err.status];
    const statusMessage = statusKey
      ? this.translateService.instant(statusKey)
      : '';
    return statusMessage || `Unknown error, status code ${err.status}.`;
  }
}
