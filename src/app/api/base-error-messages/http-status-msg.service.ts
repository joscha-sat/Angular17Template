import { inject, Injectable, Injector } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
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
  private readonly injector: Injector = inject(Injector);

  // Lazy retrieves the TranslocoService instance
  private get translocoService(): TranslocoService {
    return this.injector.get(TranslocoService);
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
    const resolvedEndpoint: ApiRoutes | string | undefined =
      this.resolveEndpoint(err, endpoint);
    const errorKey: string =
      (() => {
        const errorObj: { key?: string } | undefined = err.error as
          | { key?: string }
          | undefined;
        return errorObj && typeof errorObj.key === 'string' && errorObj.key
          ? errorObj.key
          : '';
      })().toLowerCase() || '';

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
    if (!err.url) {
      return undefined;
    }

    // Extracting the endpoint segments from the URL
    const url: URL = new URL(err.url);
    const segments: string[] = url.pathname
      .split('/')
      .filter((segment: string) => segment !== '');

    // Check if the last segment matches a UUID pattern
    const lastSegmentPattern: RegExp =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return lastSegmentPattern.test(segments[segments.length - 1])
      ? segments[segments.length - 2]
      : segments[segments.length - 1];
  }

  private resolveEndpoint(
    err: HttpErrorResponse,
    endpoint?: ApiRoutes | string,
  ): ApiRoutes | string | undefined {
    const endpointFromError: string | undefined =
      this.getEndpointFromError(err);
    return endpointFromError || endpoint;
  }

  private getTranslatedMessage(
    endpoint: ApiRoutes | string | undefined,
    method?: string,
    errorKey?: string,
  ): string | null {
    if (!errorKey) {
      return null;
    }

    const specificKey: string = this.buildSpecificTranslationKey(
      endpoint,
      method,
      errorKey,
    );
    const genericKey: string = `http-error.${errorKey}`;

    return (
      this.tryTranslateSpecific(specificKey) ??
      this.tryTranslateGeneric(genericKey) ??
      null
    );
  }

  private buildSpecificTranslationKey(
    endpoint: ApiRoutes | string | undefined,
    method?: string,
    errorKey?: string,
  ): string {
    return `http-error.${endpoint}.${method?.toLowerCase()}_${errorKey}`;
  }

  private tryTranslateSpecific(translationKey: string): string | null {
    try {
      const translated: string =
        this.translocoService.translate(translationKey);
      return translated !== translationKey && translated ? translated : null;
    } catch {
      return null;
    }
  }

  private tryTranslateGeneric(genericTranslationKey: string): string | null {
    try {
      const translated: string = this.translocoService.translate(
        genericTranslationKey,
      );
      return translated !== genericTranslationKey && translated
        ? translated
        : null;
    } catch {
      return null;
    }
  }

  private getErrorMessage(err: HttpErrorResponse): string | null {
    const errorObj: { message?: string } | undefined = err.error as
      | { message?: string }
      | undefined;
    return errorObj && typeof errorObj.message === 'string' && errorObj.message
      ? errorObj.message
      : null;
  }

  private getStatusMessage(err: HttpErrorResponse): string {
    const statusKey: string = STATUS_CODES[err.status];
    const statusMessage: string = statusKey
      ? this.translocoService.translate(statusKey)
      : '';
    return statusMessage || `Unknown error, status code ${err.status}.`;
  }
}
