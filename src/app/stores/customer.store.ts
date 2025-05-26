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
import { Customer } from '../models/Customer';
import {
  BaseQueryParams,
  ResponseWithRecords,
} from '../api/base-http-service/base-http.service';

// Extract type aliases for better readability
type CustomersSortOrder = 'asc' | 'desc';

// Extract state interface for clarity
interface CustomersState {
  customers: Customer[];
  totalCustomersCount: number;
  customer?: Customer;
  search: string;
  order: CustomersSortOrder;
}

// Extract constant for initial state
const INITIAL_STATE: CustomersState = {
  customers: [],
  totalCustomersCount: 0,
  customer: undefined,
  search: '',
  order: 'asc',
};

export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(signalState<CustomersState>(INITIAL_STATE)),
  withMethods((store, customerService = inject(CustomerService)) => {
    // Move utility function inside the store as a private method
    async function handleApiRequest<T>(
      serviceCall: Observable<T>,
      patchCallback: (data: T) => void,
    ): Promise<T> {
      const response = await lastValueFrom(serviceCall);
      patchCallback(response);
      return response;
    }

    return {
      // Renamed methods by removing redundant "Promise" suffix
      async getAllCustomers(
        queryParams?: BaseQueryParams,
      ): Promise<ResponseWithRecords<Customer>> {
        return handleApiRequest(
          customerService.getAllCustomers(queryParams),
          (getAllResponse) =>
            patchState(store, {
              customers: getAllResponse.records,
              totalCustomersCount: getAllResponse.total,
            }),
        );
      },

      async getCustomerById(id: string | number): Promise<Customer> {
        return handleApiRequest(
          customerService.getCustomerById(id),
          (customer) => patchState(store, { customer }),
        );
      },

      async createOneCustomer(customer: Customer): Promise<Customer> {
        return handleApiRequest(
          customerService.createOneCustomer(customer),
          (newCustomer) =>
            patchState(store, {
              customers: [...store.customers(), newCustomer],
            }),
        );
      },

      async updateCustomerById(
        id: string | number,
        customer: Customer,
      ): Promise<Customer> {
        return handleApiRequest(
          customerService.updateCustomerById(id, customer),
          (updatedCustomer) =>
            patchState(store, {
              customers: store
                .customers()
                .map((item) => (item.id === id ? updatedCustomer : item)),
            }),
        );
      },

      async deleteCustomerById(id: string | number): Promise<unknown> {
        return handleApiRequest(customerService.deleteCustomerById(id), () =>
          patchState(store, {
            customers: store.customers().filter((item) => item.id !== id),
          }),
        );
      },

      async deleteAllCustomers(): Promise<unknown> {
        return handleApiRequest(customerService.deleteAllCustomers(), () =>
          patchState(store, { customers: [] }),
        );
      },

      updateSearch(newValue: string): void {
        patchState(store, { search: newValue });
      },

      updateOrder(order: CustomersSortOrder): void {
        patchState(store, { order });
      },
    };
  }),
);
