import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpStatusMsgService } from '../../api/base-error-messages/http-status-msg.service';
import { MatSnackbarService } from '../../services/mat-snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const statusTranslationService: HttpStatusMsgService =
    inject(HttpStatusMsgService);
  const snackbarService: MatSnackbarService = inject(MatSnackbarService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage: string;

      errorMessage = statusTranslationService.getStatusErrorMessage(
        err,
        req.method,
      );

      if (!errorMessage) {
        errorMessage = err.message || 'unknown error';
      }

      snackbarService.showError(errorMessage);

      throw err;
    }),
  );
};
