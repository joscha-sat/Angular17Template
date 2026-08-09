import { inject, Injectable, Injector } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import type { HttpErrorResponse } from '@angular/common/http';
import type { ApiRoutes } from '../../other/enums/api-routes';

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

type ResolvedEndpoint = ApiRoutes | string | undefined;

@Injectable({
  providedIn: 'root',
})
export class HttpStatusMessageService {
  private readonly injector: Injector = inject(Injector);

  /**
   * Method to get the appropriate error message for a given HTTP error status
   * @param error - The HttpErrorResponse object
   * @param method - Optional: The HTTP method (e.g., "GET", "POST")
   * @param endpoint - Optional: Specific endpoint (e.g., "user")
   * @returns The translated error message
   */
  getStatusErrorMessage = (error: HttpErrorResponse, method?: string, endpoint?: ApiRoutes | string): string => {
    const resolvedEndpoint: ResolvedEndpoint = this.resolveEndpoint(error, endpoint);
    const errorKey: string =
      (() => {
        const errorObject: { key?: string } | undefined = error.error as { key?: string } | undefined;
        return errorObject && typeof errorObject.key === 'string' && errorObject.key ? errorObject.key : '';
      })().toLowerCase() || '';

    return (
      this.getTranslatedMessage(resolvedEndpoint, method, errorKey) ||
      this.getErrorMessage(error) ||
      this.getStatusMessage(error)
    );
  };

  // Lazy retrieves the TranslocoService instance
  private get translocoService(): TranslocoService {
    return this.injector.get(TranslocoService);
  }

  private resolveEndpoint(error: HttpErrorResponse, endpoint?: ApiRoutes | string): ResolvedEndpoint {
    const endpointFromError: string | undefined = this.getEndpointFromError(error);
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

    const specificKey: string = this.buildSpecificTranslationKey(endpoint, method, errorKey);
    const genericKey: string = `http-error.${errorKey}`;

    return this.tryTranslateSpecific(specificKey) ?? this.tryTranslateGeneric(genericKey) ?? null;
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
      const translated: string = this.translocoService.translate(translationKey);
      return translated !== translationKey && translated ? translated : null;
    } catch {
      return null;
    }
  }

  private tryTranslateGeneric(genericTranslationKey: string): string | null {
    try {
      const translated: string = this.translocoService.translate(genericTranslationKey);
      return translated !== genericTranslationKey && translated ? translated : null;
    } catch {
      return null;
    }
  }

  private getErrorMessage(error: HttpErrorResponse): string | null {
    const errorObject: { message?: string } | undefined = error.error as { message?: string } | undefined;
    return errorObject && typeof errorObject.message === 'string' && errorObject.message ? errorObject.message : null;
  }

  private getStatusMessage(error: HttpErrorResponse): string {
    const statusKey: string = STATUS_CODES[error.status];
    const statusMessage: string = statusKey ? this.translocoService.translate(statusKey) : '';
    return statusMessage || `Unknown error, status code ${error.status}.`;
  }

  /**
   * Method to extract the endpoint from the error URL
   * @param error - The HttpErrorResponse object
   * @returns The extracted endpoint as a string
   */
  getEndpointFromError(error: HttpErrorResponse): string | undefined {
    if (!error.url) {
      return undefined;
    }

    // Extracting the endpoint segments from the URL
    const url: URL = new URL(error.url);
    const segments: string[] = url.pathname.split('/').filter((segment: string) => segment !== '');

    // Check if the last segment matches a UUID pattern
    const lastSegmentPattern: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const lastSegment: string | undefined = segments.at(-1);
    return lastSegmentPattern.test(lastSegment ?? '') ? segments.at(-2) : lastSegment;
  }
}
