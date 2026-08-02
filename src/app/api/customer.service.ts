import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  type BaseQueryParams,
  GenericHttpService,
  type idTypes,
  type ResponseWithRecords,
} from './base-http-service/base-http.service';
import { Customer } from '../models/Customer';
import { ApiRoutes } from '../other/enums/api_routes';

type QueryParams = BaseQueryParams;

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends GenericHttpService {
  endpoint: ApiRoutes = ApiRoutes.CUSTOMERS;
  element_i18nKey: string = 'customer.a_customer';

  // GET ALL
  getAllCustomers(
    queryParams?: QueryParams,
  ): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>(this.endpoint, queryParams, Customer);
  }

  // GET ONE
  getCustomerById(id: string | number): Observable<Customer> {
    return this.getOne<Customer>(this.endpoint, id, Customer);
  }

  // CREATE ONE
  createOneCustomer(customer: Customer): Observable<Customer> {
    return this.createOne<Customer>(
      this.endpoint,
      customer,
      this.element_i18nKey,
    );
  }

  // CREATE MULTIPLE
  createMultipleCustomer(customer: Customer[]): Observable<Customer[]> {
    return this.createMultiple<Customer>(
      this.endpoint,
      customer,
      this.element_i18nKey,
    );
  }

  // UPDATE ONE
  updateCustomerById(id: idTypes, customer: Customer): Observable<Customer> {
    return this.updateOne<Customer>(
      this.endpoint,
      customer,
      id,
      this.element_i18nKey,
    );
  }

  // UPDATE MULTIPLE
  updateMultipleCustomerById(
    id: idTypes[],
    customers: Customer[],
  ): Observable<Customer[]> {
    return this.updateMultiple<Customer>(
      this.endpoint,
      customers,
      id,
      this.element_i18nKey,
    );
  }

  // DELETE ONE
  deleteCustomerById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey);
  }

  // DELETE ALL
  deleteAllCustomers(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
