import { inject, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiRoutes } from '../../other/enums/api_routes';

// A mapping of HTTP status codes to error messages
const STATUS_CODES: { [key: number]: string } = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  409: 'Conflict',
  500: 'Internal Server Error',
};

@Injectable({
  providedIn: 'root',
})
export class HttpStatusMsgService {
  private readonly injector: Injector = inject(Injector);

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
    // Without translation service, we return null to fall back to other error messages
    return null;
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
    const statusMessage: string = STATUS_CODES[err.status];
    return statusMessage || `Unknown error, status code ${err.status}.`;
  }
}
