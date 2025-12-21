import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../api/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../../models/User';

const TOKEN_REFRESH_SUCCESS_STATUS = HttpStatusCode.Created;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  // Add authorization header to the request
  const requestWithToken = addAuthorizationHeader(req, authService);
  // Handle request and catch errors
  return next(requestWithToken).pipe(
    catchError((error) =>
      handleHttpError(error, requestWithToken, next, authService),
    ),
  );
};

/**
 * Adds the authorization header with bearer token to the request
 */
function addAuthorizationHeader(
  req: HttpRequest<unknown>,
  authService: AuthService,
): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + authService.getAccessToken(),
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
    switchMap(
      (response: {
        status: number;
        data: { access: string; refresh: string; user: any };
      }) => {
        if (response.status === TOKEN_REFRESH_SUCCESS_STATUS) {
          // Update tokens and user data
          authService.setTokens(response.data.access, response.data.refresh);
          authService.setLoggedInUser(response.data.user as User);
          // Clone the original request with the new access token
          const requestWithNewToken = addAuthorizationHeader(
            originalRequest,
            authService,
          );
          // Retry the original request with the new token
          return next(requestWithNewToken);
        } else {
          authService.logout();
          return throwError(() => createError(response)) as Observable<
            HttpEvent<unknown>
          >;
        }
      },
    ),
    catchError((refreshError) => {
      authService.logout();
      return throwError(() => createError(refreshError)) as Observable<
        HttpEvent<unknown>
      >;
    }),
  );
}
