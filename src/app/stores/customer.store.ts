import {
  patchState,
  signalState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { CustomerService } from '../api/customer.service';
import { Customer } from '../other/models/Customer';
import {
  BaseQueryParams,
  ResponseWithRecords,
} from '../api/base-http-service/base-http.service';

type CustomersState = {
  customers: Customer[];
  totalCustomersCount: number;
  customer?: Customer;
  filter: { queryParams: any; order: 'asc' | 'desc' };
};

const initialState = signalState<CustomersState>({
  customers: [],
  totalCustomersCount: 0,
  customer: undefined,
  filter: { queryParams: {}, order: 'asc' },
});

async function apiRequestAndPatchStoreData<T>(
  serviceCall: Observable<T>,
  patchCallback: (data: T) => void,
): Promise<T> {
  const response = await lastValueFrom(serviceCall);
  patchCallback(response);
  return response;
}

export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, customerService = inject(CustomerService)) => ({
    // GET ALL Customer
    async getAllCustomersPromise(
      queryParams?: BaseQueryParams,
    ): Promise<ResponseWithRecords<Customer>> {
      return apiRequestAndPatchStoreData(
        customerService.getAllCustomers(queryParams),
        (getAllResponse) =>
          patchState(store, {
            customers: getAllResponse.records,
            totalCustomersCount: getAllResponse.total,
          }),
      );
    },

    // GET ONE Customer
    async getCustomerByIdPromise(id: string | number): Promise<Customer> {
      return apiRequestAndPatchStoreData(
        customerService.getCustomerById(id),
        (customer) => patchState(store, { customer }),
      );
    },

    // CREATE ONE Customer
    async createOneCustomerPromise(customer: Customer): Promise<Customer> {
      return apiRequestAndPatchStoreData(
        customerService.createOneCustomer(customer),
        (newCustomer) =>
          patchState(store, {
            customers: [...store.customers(), newCustomer],
          }),
      );
    },

    // UPDATE ONE Customer
    async updateCustomerByIdPromise(
      id: string | number,
      customer: Customer,
    ): Promise<Customer> {
      return apiRequestAndPatchStoreData(
        customerService.updateCustomerById(id, customer),
        (updatedCustomer) =>
          patchState(store, {
            customers: store
              .customers()
              .map((item) => (item.id === id ? updatedCustomer : item)),
          }),
      );
    },

    // DELETE ONE Customer
    async deleteCustomerByIdPromise(id: string | number) {
      return apiRequestAndPatchStoreData(
        customerService.deleteCustomerById(id),
        () =>
          patchState(store, {
            customers: store.customers().filter((item) => item.id !== id),
          }),
      );
    },

    // DELETE ALL Customer
    async deleteAllCustomersPromise() {
      return apiRequestAndPatchStoreData(
        customerService.deleteAllCustomers(),
        () => patchState(store, { customers: [] }),
      );
    },
  })),
);
