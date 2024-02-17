import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, finalize, mergeMap, of, timer } from "rxjs";
import { inject } from "@angular/core";
import { LoadingService } from "../../services/loading.service";

export const isLoadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);
  // Start a timer that emits after 250ms
  const loadingTimer$ = timer(250);

  loadingService.setLoadingState(false);
  let completed = false;

  return next(req).pipe(
    mergeMap((event) => {
      // Request completed before 1 second, set loadingState to false
      loadingTimer$.subscribe(() => {
        if (!completed) {
          loadingService.setLoadingState(true);
        }
      });
      return of(event);
    }),
    catchError((error) => {
      // Request encountered an error
      loadingService.setLoadingState(false);
      throw error;
    }),
    finalize(() => {
      loadingService.setLoadingState(false);
      completed = true;
    }),
  );
};

