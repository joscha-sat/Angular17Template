import { computed, inject, type Signal } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { type QueryParams, UserService } from '../api/user.service';
import { ResponseWithRecords } from '../api/base-http-service/base-http.service';
import { User } from '../models/User';
import { createRxMethod } from './signal-store-utility-service/signal-store-utility.service';

type UserState = {
  user: ResponseWithRecords<User> | undefined;
  selectedUser: User | undefined;
  loading: boolean;
};

const initialState: UserState = {
  user: undefined,
  selectedUser: undefined,
  loading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },

  // ENTITIES
  withEntities<User>(),

  // STATE
  withState(initialState),

  // COMPUTED
  withComputed(({ user }: { user: Signal<ResponseWithRecords<User> | undefined> }) => ({
    totalCount: computed(() => user()?.total ?? 0),
  })),

  // METHODS
  withMethods((store, service: UserService = inject(UserService)) => ({
    // GET ALL
    getAllUsers: createRxMethod<QueryParams | undefined, ResponseWithRecords<User>>(
      store,
      (queryParams) => service.getAllUsers(queryParams),
      (items) => patchState(store, setAllEntities(items.records), { user: items }),
    ),

    // GET ONE BY ID
    getUserById: createRxMethod<string | number, User>(
      store,
      (id) => service.getUserById(id),
      (item) => patchState(store, setEntity(item), { selectedUser: item }),
    ),

    // CREATE ONE
    createOneUser: createRxMethod<User, User>(
      store,
      (payload) => service.createOneUser(payload),
      (item) => patchState(store, addEntity(item)),
    ),

    // UPDATE ONE BY ID
    updateUserById: createRxMethod<User, User>(
      store,
      (payload) => service.updateUserById(payload.id, payload),
      (item) => patchState(store, updateEntity({ id: item.id, changes: item })),
    ),

    // DELETE ONE BY ID
    deleteUserById: createRxMethod<string | number, unknown>(
      store,
      (id) => service.deleteUserById(id),
      (_result, id) => patchState(store, removeEntity(id)),
    ),
  })),
);
