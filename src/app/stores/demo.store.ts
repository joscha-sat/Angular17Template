// import { computed, inject } from '@angular/core';
// import { tapResponse } from '@ngrx/operators';
// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withHooks,
//   withMethods,
//   withState,
// } from '@ngrx/signals';
// import { rxMethod } from '@ngrx/signals/rxjs-interop';
// import { pipe, switchMap, tap } from 'rxjs';
//
// // STATE
// interface AppState {
//   items: string[];
//   loading: boolean;
// }
//
// const initialState: AppState = {
//   items: [],
//   loading: false,
// };
//
// export const AppStore = signalStore(
//   { providedIn: 'root' },
//
//   // STATE
//   withState(initialState),
//
//   // COMPUTED
//   withComputed(({ items }) => ({
//     itemCount: computed(() => items().length),
//   })),
//
//   // API METHODS
//   withMethods((state, apiService = inject(ApiService)) => ({
//     loadItems: rxMethod<void>(
//       pipe(
//         tap(() => patchState(state, { loading: true })),
//         switchMap(() =>
//           apiService.getItems().pipe(
//             tapResponse({
//               next: (items) => patchState(state, { items }),
//               error: (err) => console.error(err),
//               finalize: () => patchState(state, { loading: false }),
//             }),
//           ),
//         ),
//       ),
//     ),
//   })),
//
//   // LIFECYCLE
//   withHooks({
//     onInit(state) {
//       state.loadItems();
//     },
//   }),
// );
