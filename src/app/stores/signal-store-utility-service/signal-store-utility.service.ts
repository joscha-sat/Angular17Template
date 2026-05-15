import { patchState, type WritableStateSource } from '@ngrx/signals';
import { rxMethod, type RxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { finalize, type Observable, pipe, switchMap, tap } from 'rxjs';

/**
 * Creates an rxMethod that wraps a service call with loading state management,
 * error handling via console.error, and automatic finalize cleanup.
 *
 * @param store - The signal store instance (used for patchState)
 * @param serviceCall - Function that takes the input and returns an Observable
 * @param onSuccess - Callback invoked with the result and the original input
 */
export function createRxMethod<TInput, TOutput>(
  store: WritableStateSource<Record<string, unknown>>,
  serviceCall: (input: TInput) => Observable<TOutput>,
  onSuccess: (result: TOutput, input: TInput) => void,
): RxMethod<TInput> {
  return rxMethod<TInput>(
    pipe(
      tap(() => patchState(store, { loading: true })),
      switchMap((input: TInput) =>
        serviceCall(input).pipe(
          tapResponse({
            next: (result: TOutput) => onSuccess(result, input),
            error: console.error,
          }),
          finalize(() => patchState(store, { loading: false })),
        ),
      ),
    ),
  );
}
