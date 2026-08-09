import type { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpStatusMessageService } from '../../api/base-error-messages/http-status-message.service';
import { MatSnackbarService, type SnackBarData } from '../../services/mat-snackbar.service';
import { ApiSnackbarComponent } from '../../shared/api-snackbar/api-snackbar.component';

export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const statusTranslationService: HttpStatusMessageService = inject(HttpStatusMessageService);
  const snackbarService: MatSnackbarService = inject(MatSnackbarService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage: string;

      errorMessage = statusTranslationService.getStatusErrorMessage(error, request.method);

      if (!errorMessage) {
        errorMessage = error.message || 'unknown error';
      }

      const snackbarPayload: SnackBarData = {
        errorStatus: error.status,
        i18nKeyOrMessage: errorMessage,
      };

      snackbarService.openSnackBar(ApiSnackbarComponent, 'error', snackbarPayload);

      throw error;
    }),
  );
};
