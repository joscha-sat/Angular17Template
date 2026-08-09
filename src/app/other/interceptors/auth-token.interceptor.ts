import { catchError, from, map, of, type Observable, switchMap, throwError } from 'rxjs';
import { AuthService, type RefreshTokenResponse } from '../../api/auth.service';
import {
  type HttpErrorResponse,
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';

const TOKEN_REFRESH_SUCCESS_STATUS: HttpStatusCode = HttpStatusCode.Created;

export const authTokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  // Add authorization header to the request
  const requestWithToken: HttpRequest<unknown> = addAuthorizationHeader(request, authService);
  // Handle request and catch errors
  return next(requestWithToken).pipe(
    catchError((error: HttpErrorResponse) => handleHttpError(error, requestWithToken, next, authService)),
  );
};

/**
 * Adds the authorization header with bearer token to the request
 */
function addAuthorizationHeader(request: HttpRequest<unknown>, authService: AuthService): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getAccessToken()}`,
    },
  });
}

/**
 * Creates an Error object from any value for use with throwError
 */
function createError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  return new Error(JSON.stringify(value));
}

/**
 * Handles HTTP errors and determines the appropriate response
 */
function handleHttpError(
  error: HttpErrorResponse,
  originalRequest: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
): Observable<HttpEvent<unknown>> {
  if (error.status !== HttpStatusCode.Unauthorized) {
    return throwError(() => error) as Observable<HttpEvent<unknown>>;
  }

  if (!authService.getRefreshToken()) {
    return throwError(() => error) as Observable<HttpEvent<unknown>>;
  }

  return authService.sendRefreshToken().pipe(
    switchMap((response: RefreshTokenResponse) => {
      if (response.status === TOKEN_REFRESH_SUCCESS_STATUS) {
        // Update tokens and user data
        authService.setTokens(response.data.access, response.data.refresh);
        authService.setLoggedInUser(response.data.user);
        // Clone the original request with the new access token
        const requestWithNewToken: HttpRequest<unknown> = addAuthorizationHeader(originalRequest, authService);
        // Retry the original request with the new token
        return next(requestWithNewToken);
      }
      return from(authService.logout()).pipe(
        map(() => false),
        catchError(() => of(false)),
        switchMap(() => throwError(() => createError(response))),
      ) as Observable<HttpEvent<unknown>>;
    }),
    catchError(
      (refreshError: unknown) =>
        from(authService.logout()).pipe(
          map(() => false),
          catchError(() => of(false)),
          switchMap(() => throwError(() => createError(refreshError))),
        ) as Observable<HttpEvent<unknown>>,
    ),
  );
}
