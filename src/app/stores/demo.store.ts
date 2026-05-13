// import { computed } from '@angular/core';
// import { inject } from '@angular/core';
// import {
//   signalStore,
//   withState,
//   withComputed,
//   withMethods,
//   withHooks,
//   patchState,
// } from '@ngrx/signals';
// import {
//   withEntities,
//   setAllEntities,
//   setEntity,
//   addEntity,
//   updateEntity,
//   removeEntity,
// } from '@ngrx/signals/entities';
// import { rxMethod } from '@ngrx/signals/rxjs-interop';
// import { tapResponse } from '@ngrx/operators';
// import { pipe, switchMap, tap, finalize } from 'rxjs';
// import { DemoService } from '../api/demo.service';
// import { ResponseWithRecords } from '../api/base-http-service/base-http.service';
// import { Demo } from '../models/Demo';
//
// interface DemoState {
//   demo?: ResponseWithRecords<Demo>;
//   selectedDemo?: Demo;
//   loading: boolean;
// }
//
// const initialState: DemoState = {
//   demo: undefined,
//   selectedDemo: undefined,
//   loading: false,
// };
//
// export const DemoStore = signalStore(
//   { providedIn: 'root' },
//
//   // ENTITIES
//   withEntities<Demo>(),
//
//   // STATE
//   withState(initialState),
//
//   // COMPUTED
//   withComputed(({ entities }) => ({
//     totalCount: computed(() => entities().length),
//   })),
//
//   // METHODS
//   withMethods((store, service = inject(DemoService)) => ({
//     // GET ALL
//     getAllDemos: rxMethod<void>(
//       pipe(
//         tap(() => patchState(store, { loading: true })),
//         switchMap(() =>
//           service.getAllDemos().pipe(
//             tapResponse({
//               next: (items) =>
//                 patchState(store, setAllEntities(items.records), {
//                   demo: items,
//                 }),
//               error: console.error,
//             }),
//             finalize(() => patchState(store, { loading: false })),
//           ),
//         ),
//       ),
//     ),
//
//     // GET ONE BY ID
//     getDemoById: rxMethod<number>(
//       pipe(
//         tap(() => patchState(store, { loading: true })),
//         switchMap((id) =>
//           service.getDemoById(id).pipe(
//             tapResponse({
//               next: (item) =>
//                 patchState(store, setEntity(item), { selectedDemo: item }),
//               error: console.error,
//             }),
//             finalize(() => patchState(store, { loading: false })),
//           ),
//         ),
//       ),
//     ),
//
//     // CREATE ONE
//     createOneDemo: rxMethod<Demo>(
//       pipe(
//         tap(() => patchState(store, { loading: true })),
//         switchMap((payload) =>
//           service.createOneDemo(payload).pipe(
//             tapResponse({
//               next: (item) => patchState(store, addEntity(item)),
//               error: console.error,
//             }),
//             finalize(() => patchState(store, { loading: false })),
//           ),
//         ),
//       ),
//     ),
//
//     // UPDATE ONE BY ID
//     updateDemoById: rxMethod<Demo>(
//       pipe(
//         tap(() => patchState(store, { loading: true })),
//         switchMap((payload) =>
//           service.updateDemoById(payload.id, payload).pipe(
//             tapResponse({
//               next: (item) =>
//                 patchState(store, updateEntity({ id: item.id, changes: item })),
//               error: console.error,
//             }),
//             finalize(() => patchState(store, { loading: false })),
//           ),
//         ),
//       ),
//     ),
//
//     // DELETE ONE BY ID
//     deleteDemoById: rxMethod<number>(
//       pipe(
//         tap(() => patchState(store, { loading: true })),
//         switchMap((id) =>
//           service.deleteDemoById(id).pipe(
//             tapResponse({
//               next: () => patchState(store, removeEntity(id)),
//               error: console.error,
//             }),
//             finalize(() => patchState(store, { loading: false })),
//           ),
//         ),
//       ),
//     ),
//   })),
//
//   // HOOKS
//   // withHooks({
//   //   onInit({ getAllDemos }) {
//   //     getAllDemos(undefined);
//   //   },
//   // }),
// );
