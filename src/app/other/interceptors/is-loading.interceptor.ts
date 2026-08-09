import {
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, delay, finalize, of, tap } from 'rxjs';
import { inject, signal, type WritableSignal } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

// Set initial request count at '0'
const count: WritableSignal<number> = signal(0);

export const loadingInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Inject the LoadingService
  const loaderService: LoadingService = inject(LoadingService);

  // Increase request count by '1'
  count.update((value: number) => value + 1);

  // Start a subscription that sets loading state to true after 300ms
  const load$: import('rxjs').Subscription = of(null)
    .pipe(delay(300))
    .subscribe(() => loaderService.setLoadingState(true));

  return next(request).pipe(
    tap((response: HttpEvent<unknown>) => {
      if (response instanceof HttpResponse) {
        // If response received, decrease request count by '1'
        count.update((value: number) => value - 1);
      }
    }),
    catchError((error: unknown) => {
      // If error occurs, decrease request count by '1'
      count.update((value: number) => value - 1);
      throw error;
    }),
    finalize(() => {
      // On finalize, end the subscription and hide the loading state
      load$.unsubscribe();
      loaderService.setLoadingState(false);
    }),
  );
};
