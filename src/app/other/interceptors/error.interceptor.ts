import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from "rxjs";
import { inject } from "@angular/core";
import { TuiSnackbarService } from "../../services/tui-snackbar.service";
import { HttpStatusMsgService } from "./http-status-msg.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(TuiSnackbarService)
  const statusTranslationService = inject(HttpStatusMsgService)

  return next(req).pipe(
    catchError((err) => {
      let errorMessage: string;

      try {
        errorMessage = statusTranslationService.getStatusErrorMessage(err);
      } catch (error) {
        errorMessage = err.error.message ?? 'unbekannt';
      }

      snackbarService.openSnackbar("error", "Fehler: " + err.status, errorMessage);
      throw err;
    })
  );
};




