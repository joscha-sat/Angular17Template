import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  setEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { TenantService } from '../api/tenant.service';
import { ResponseWithRecords } from '../api/base-http-service/base-http.service';
import { Tenant } from '../models/Tenant';

interface TenantState {
  tenant?: ResponseWithRecords<Tenant>;
  selectedTenant?: Tenant;
  loading: boolean;
}

const initialState: TenantState = {
  tenant: undefined,
  selectedTenant: undefined,
  loading: false,
};

export const TenantStore = signalStore(
  { providedIn: 'root' },

  // ENTITIES
  withEntities<Tenant>(),

  // STATE
  withState(initialState),

  // COMPUTED
  withComputed(({ entities }) => ({
    totalCount: computed(() => entities().length),
  })),

  // METHODS
  withMethods((store, service = inject(TenantService)) => ({
    // GET ALL
    getAllTenants: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          service.getAllTenants().pipe(
            tapResponse({
              next: (items) =>
                patchState(store, setAllEntities(items.records), {
                  tenant: items,
                }),
              error: console.error,
            }),
            finalize(() => patchState(store, { loading: false })),
          ),
        ),
      ),
    ),

    // GET ONE BY ID
    getTenantById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((id) =>
          service.getTenantById(id).pipe(
            tapResponse({
              next: (item) =>
                patchState(store, setEntity(item), { selectedTenant: item }),
              error: console.error,
            }),
            finalize(() => patchState(store, { loading: false })),
          ),
        ),
      ),
    ),

    // CREATE ONE
    createOneTenant: rxMethod<Tenant>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((payload) =>
          service.createOneTenant(payload).pipe(
            tapResponse({
              next: (item) => patchState(store, addEntity(item)),
              error: console.error,
            }),
            finalize(() => patchState(store, { loading: false })),
          ),
        ),
      ),
    ),

    // UPDATE ONE BY ID
    updateTenantById: rxMethod<Tenant>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((payload) =>
          service.updateTenantById(payload.id, payload).pipe(
            tapResponse({
              next: (item) =>
                patchState(store, updateEntity({ id: item.id, changes: item })),
              error: console.error,
            }),
            finalize(() => patchState(store, { loading: false })),
          ),
        ),
      ),
    ),

    // DELETE ONE BY ID
    deleteTenantById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((id) =>
          service.deleteTenantById(id).pipe(
            tapResponse({
              next: () => patchState(store, removeEntity(id)),
              error: console.error,
            }),
            finalize(() => patchState(store, { loading: false })),
          ),
        ),
      ),
    ),
  })),

  // HOOKS
  withHooks({
    onInit({ getAllTenants }) {
      getAllTenants(undefined);
    },
  }),
);
