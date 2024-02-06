import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../api/auth.service";
import { HttpInterceptorFn, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Initialize service instance
  const authService = inject(AuthService);

  // Add authorization header
  req = req.clone({
    setHeaders: {
      Authorization: "Bearer " + authService.getAccessToken(),
    },
  });

  // Handle request and catch errors
  return next(req).pipe(
    catchError((error) => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        return throwError(error);
      }

      if (authService.getRefreshToken()) {
        // Refresh token and send original request again
        return authService.sendRefreshToken().pipe(
          switchMap((response) => {
            if (response.status === HttpStatusCode.Created) {
              authService.setTokens(response.data.access, response.data.refresh);
              authService.setLoggedInUser(response.data.user);
              req = req.clone({
                setHeaders: {
                  Authorization: "Bearer " + authService.getAccessToken(),
                },
              });
              return next(req);
            } else {
              authService.logout();
              return throwError(response);
            }
          }),
          catchError((error) => {
            authService.logout();
            return throwError(error);
          }),
        );
      } else {
        return throwError(error);
      }
    }),
  );
};
