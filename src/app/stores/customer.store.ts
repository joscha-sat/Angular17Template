import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { Customer } from '../../client';
import { CustomerService } from '../api/customer.service';
import { ResponseWithRecords } from '../api/base-http-service/base-http.service';

// STATE TYPES
interface CustomerState {
  customersWithRecords: ResponseWithRecords<Customer> | undefined;
  loading: boolean;
}

// STATE
const initialState: CustomerState = {
  customersWithRecords: undefined,
  loading: false,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  // ENTITIES
  withEntities<Customer>(),

  // STATE
  withState(initialState),

  // COMPUTED
  withComputed(({ entities, loading }) => ({
    totalCount: computed(() => entities().length),
    isLoading: computed(() => loading()),
  })),

  // API METHODS
  withMethods((store, service = inject(CustomerService)) => ({
    // GET ALL
    getAllCustomer: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          service.getAllCustomers().pipe(
            tapResponse({
              next: (customer: ResponseWithRecords<Customer>) =>
                patchState(store, setAllEntities(customer.records), {
                  customersWithRecords: customer,
                  loading: false,
                }),
              error: (err: Error) => patchState(store),
            }),
          ),
        ),
      ),
    ),

    // GET ONE BY ID
    // getOneCustomer: rxMethod<number>(
    //   pipe(
    //     tap(() => patchState(store, { loading: true, error: null })),
    //     switchMap((id) =>
    //       service.getOne(id).pipe(
    //         tapResponse({
    //           next: (item) =>
    //             patchState(store, setEntity(item), { loading: false }),
    //           error: (err: Error) =>
    //             patchState(store, { error: err.message, loading: false }),
    //         }),
    //       ),
    //     ),
    //   ),
    // ),

    // // CREATE ONE
    // createOneCustomer: rxMethod<Omit<Item, 'id'>>(
    //   pipe(
    //     tap(() => patchState(store, { loading: true, error: null })),
    //     switchMap((payload) =>
    //       service.createOne(payload).pipe(
    //         tapResponse({
    //           next: (item) =>
    //             patchState(store, addEntity(item), { loading: false }),
    //           error: (err: Error) =>
    //             patchState(store, { error: err.message, loading: false }),
    //         }),
    //       ),
    //     ),
    //   ),
    // ),
    //
    // // UPDATE ONE BY ID
    // updateOneCustomerById: rxMethod<Item>(
    //   pipe(
    //     tap(() => patchState(store, { loading: true, error: null })),
    //     switchMap((payload) =>
    //       service.updateOne(payload.id, payload).pipe(
    //         tapResponse({
    //           next: (item) =>
    //             patchState(
    //               store,
    //               updateEntity({ id: item.id, changes: item }),
    //               { loading: false },
    //             ),
    //           error: (err: Error) =>
    //             patchState(store, { error: err.message, loading: false }),
    //         }),
    //       ),
    //     ),
    //   ),
    // ),
    //
    // // DELETE ONE BY ID
    // deleteOneCustomerById: rxMethod<number>(
    //   pipe(
    //     tap(() => patchState(store, { loading: true, error: null })),
    //     switchMap((id) =>
    //       service.deleteOne(id).pipe(
    //         tapResponse({
    //           next: () =>
    //             patchState(store, removeEntity(id), { loading: false }),
    //           error: (err: Error) =>
    //             patchState(store, { error: err.message, loading: false }),
    //         }),
    //       ),
    //     ),
    //   ),
    // ),
  })),
);
