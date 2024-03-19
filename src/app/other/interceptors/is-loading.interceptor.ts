import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { catchError, delay, finalize, of, tap } from "rxjs";
import { inject, signal } from "@angular/core";
import { LoadingService } from "../../services/loading.service";

// Set initial request count at '0'
const count = signal(0);

export const isLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the LoadingService
  const loaderService = inject(LoadingService);

  // Increase request count by '1'
  count.update(val => val + 1);

  // Start a subscription that sets loading state to true after 300ms
  const load$ = of(null).pipe(delay(300)).subscribe(() => loaderService.setLoadingState(true));

  return next(req).pipe(
    tap(res => {
      if (res instanceof HttpResponse) {
        // If response received, decrease request count by '1'
        count.update(value => value - 1);
      }
    }),
    catchError(err => {
      // If error occurs, decrease request count by '1'
      count.update(value => value - 1);
      throw err;
    }),
    finalize(() => {
      // On finalize, end the subscription and hide the loading state
      load$.unsubscribe();
      loaderService.setLoadingState(false);
    })
  );
};
