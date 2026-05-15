import { patchState, type WritableStateSource } from '@ngrx/signals';
import { rxMethod, type RxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, type Observable, pipe, switchMap, tap } from 'rxjs';

/**
 * Creates an rxMethod that wraps a service call with loading state management
 * and automatic finalize cleanup.
 *
 * @param store - The signal store instance (used for patchState)
 * @param serviceCall - Function that takes the input and returns an Observable
 * @param onSuccess - Callback invoked with the result and the original input
 * @param withLoading - Whether to track loading state (default: true). Set to false if the store has no loading property.
 */
export function createRxMethod<Params, ApiResponse>(
  store: WritableStateSource<Record<string, unknown>>,
  serviceCall: (input: Params) => Observable<ApiResponse>,
  onSuccess: (result: ApiResponse, input: Params) => void,
  withLoading: boolean = true,
): RxMethod<Params> {
  return rxMethod<Params>(
    pipe(
      tap(() => {
        if (withLoading) {
          patchState(store, { loading: true });
        }
      }),
      switchMap((input: Params) =>
        serviceCall(input).pipe(
          tap((result: ApiResponse) => onSuccess(result, input)),
          finalize(() => {
            if (withLoading) {
              patchState(store, { loading: false });
            }
          }),
        ),
      ),
    ),
  );
}
