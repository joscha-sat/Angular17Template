import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpStatusMsgService } from '../../api/error-messages/http-status-msg.service';
import {
  MatSnackbarService,
  SnackBarData,
} from '../../services/mat-snackbar.service';
import { ApiSnackbarComponent } from '../../shared/api-snackbar/api-snackbar.component';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const statusTranslationService = inject(HttpStatusMsgService);
  const snackbarService = inject(MatSnackbarService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage: string;

      errorMessage = statusTranslationService.getStatusErrorMessage(
        err,
        req.method,
      );

      if (!errorMessage) {
        errorMessage = err.message ?? 'unknown error';
      }

      const snackbarPayload: SnackBarData = {
        errorStatus: err.status,
        i18nKeyOrMessage: errorMessage,
      };

      snackbarService.openSnackBar(
        ApiSnackbarComponent,
        'error',
        snackbarPayload,
      );

      throw err;
    }),
  );
};
