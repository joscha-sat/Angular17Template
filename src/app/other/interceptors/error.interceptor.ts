import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpStatusMsgService } from '../../api/error-messages/http-status-msg.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const statusTranslationService = inject(HttpStatusMsgService);

  return next(req).pipe(
    catchError((err) => {
      let errorMessage: string;
      try {
        errorMessage = statusTranslationService.getStatusErrorMessage(
          err,
          req.method,
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        errorMessage = err.error.message ?? 'unbekannt';
      }

      // snackbarService.openSnackbar(
      //   'error',
      //   'Fehler: ' + err.status,
      //   errorMessage,
      // );

      // snackbarService.openSnackbar(
      //   'error',
      //   'Fehler: ' + err.status,
      //   errorMessage,
      // );
      throw err;
    }),
  );
};
