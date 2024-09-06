import {
  patchState,
  signalState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import {
  distinctUntilChanged,
  exhaustMap,
  lastValueFrom,
  pipe,
  switchMap,
} from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type DemosState = {
  demos: Demo[];
  demo?: Demo;
};

const initialState = signalState<DemosState>({
  demos: [],
  demo: undefined,
  filter: { queryParams: {}, order: 'asc' },
});

export const DemosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // METHODS ----------------------------------------------------------------------------------- //
  withMethods((store, demoService = inject(DemoService)) => ({
    // Methods with Observable ---------------------------------------------------------------- //
    // GET ALL Demos
    getAllDemos: rxMethod<DemoQueryParams>(
      pipe(
        distinctUntilChanged(),
        switchMap((query) => {
          return demoService.getAllDemos(query).pipe(
            tapResponse({
              next: (res) => patchState(store, { demos: res.results }),
              error: (err) => {
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),

    // GET ONE Demo BY ID
    getDemoById: rxMethod<string | number>(
      switchMap((id) => {
        return demoService.getDemoById(id).pipe(
          tapResponse({
            next: (demo) => patchState(store, { demo: demo }),
            error: console.error,
          }),
        );
      }),
    ),

    // CREATE ONE Demo
    createOneDemo: rxMethod<Demo>(
      switchMap((demo) => {
        return demoService.createOneDemo(demo).pipe(
          tapResponse({
            next: (newDemo) =>
              patchState(store, { demos: [...store.demos(), newDemo] }),
            error: console.error,
          }),
        );
      }),
    ),

    // UPDATE ONE Demo BY ID
    updateDemoById: rxMethod<{ id: string | number; demo: Demo }>(
      switchMap(({ id, demo }) => {
        return demoService.updateDemoById(id, demo).pipe(
          tapResponse({
            next: (updatedDemo) =>
              patchState(store, {
                demos: store
                  .demos()
                  .map((item) => (item.id === id ? updatedDemo : item)),
              }),
            error: console.error,
          }),
        );
      }),
    ),

    // DELETE ONE Demo BY ID
    deleteDemoById: rxMethod<string | number>(
      switchMap((id) => {
        return demoService.deleteDemoById(id).pipe(
          tapResponse({
            next: () =>
              patchState(store, {
                demos: store.demos().filter((item) => item.id !== id),
              }),
            error: console.error,
          }),
        );
      }),
    ),

    // DELETE ALL Demos
    deleteAllDemos: rxMethod<void>(
      exhaustMap(() => {
        return demoService.deleteAllDemos().pipe(
          tapResponse({
            next: () => patchState(store, { demos: [] }),
            error: console.error,
          }),
        );
      }),
    ),

    // Methods with Promise -------------------------------------------------------------------- //

    // GET ALL Demo
    async getAllDemosPromise(queryParams?: DemoQueryParams) {
      const allDemos = await lastValueFrom(
        demoService.getAllDemos(queryParams),
      );
      patchState(store, { demos: allDemos.results });
    },

    // GET ONE Demo
    async getDemoByIdPromise(id: string | number) {
      const demo = await lastValueFrom(demoService.getDemoById(id));
      patchState(store, { demo: demo });
    },

    // CREATE ONE Demo
    async createOneDemoPromise(demo: Demo) {
      const newDemo = await lastValueFrom(demoService.createOneDemo(demo));
      patchState(store, { demos: [...store.demos(), newDemo] });
    },

    // UPDATE ONE Demo
    async updateDemoByIdPromise(id: string | number, demo: Demo) {
      const updatedDemo = await lastValueFrom(
        demoService.updateDemoById(id, demo),
      );
      patchState(store, {
        demos: store
          .demos()
          .map((item) => (item.id === id ? updatedDemo : item)),
      });
    },

    // DELETE ONE Demo
    async deleteDemoByIdPromise(id: string | number) {
      await lastValueFrom(demoService.deleteDemoById(id));
      patchState(store, {
        demos: store.demos().filter((item) => item.id !== id),
      });
    },

    // DELETE ALL Demo
    async deleteAllDemosPromise() {
      await lastValueFrom(demoService.deleteAllDemos());
      patchState(store, { demos: [] });
    },
  })),
);
