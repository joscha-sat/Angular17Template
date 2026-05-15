import { computed, inject, type Signal } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { type TenantQueryParams, TenantService } from '../api/tenant.service';
import { ResponseWithRecords } from '../api/base-http-service/base-http.service';
import { Tenant } from '../models/Tenant';
import { createRxMethod } from './signal-store-utility-service/signal-store-utility.service';

type TenantState = {
  tenant?: ResponseWithRecords<Tenant>;
  selectedTenant?: Tenant;
  loading: boolean;
};

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
  withComputed(({ entities }: { entities: Signal<Tenant[]> }) => ({
    totalCount: computed(() => entities().length),
  })),

  // METHODS
  withMethods((store, service: TenantService = inject(TenantService)) => ({
    // GET ALL
    getAllTenants: createRxMethod<TenantQueryParams | undefined, ResponseWithRecords<Tenant>>(
      store,
      (queryParams) => service.getAllTenants(queryParams),
      (items) => patchState(store, setAllEntities(items.records), { tenant: items }),
    ),

    // GET ONE BY ID
    getTenantById: createRxMethod<string | number, Tenant>(
      store,
      (id) => service.getTenantById(id),
      (item) => patchState(store, setEntity(item), { selectedTenant: item }),
    ),

    // CREATE ONE
    createOneTenant: createRxMethod<Tenant, Tenant>(
      store,
      (payload) => service.createOneTenant(payload),
      (item) => patchState(store, addEntity(item)),
    ),

    // UPDATE ONE BY ID
    updateTenantById: createRxMethod<Tenant, Tenant>(
      store,
      (payload) => service.updateTenantById(payload.id, payload),
      (item) => patchState(store, updateEntity({ id: item.id, changes: item })),
    ),

    // DELETE ONE BY ID
    deleteTenantById: createRxMethod<string | number, unknown>(
      store,
      (id) => service.deleteTenantById(id),
      (_result, id) => patchState(store, removeEntity(id)),
    ),
  })),

  // HOOKS
  withHooks({
    onInit({ getAllTenants }: { getAllTenants: (value: TenantQueryParams | undefined) => void }) {
      getAllTenants(undefined);
    },
  }),
);
