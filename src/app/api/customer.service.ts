import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  type BaseQueryParams,
  GenericHttpService,
  type idTypes,
  type ResponseWithRecords,
} from './base-http-service/base-http.service';
import type { Customer } from '../models/Customer';
import { ApiRoutes } from '../other/enums/api_routes';
import { type DeleteResponse, deleteResponseSchema } from './schemas/common.schemas';
import { customerListResponseSchema, customerResponseSchema } from './schemas/resource.schemas';

type QueryParams = BaseQueryParams;

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends GenericHttpService {
  endpoint: ApiRoutes = ApiRoutes.CUSTOMERS;
  element_i18nKey: string = 'customer.a_customer';

  // GET ALL
  getAllCustomers(queryParams?: QueryParams): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>(this.endpoint, queryParams, customerListResponseSchema);
  }

  // GET ONE
  getCustomerById(id: string | number): Observable<Customer> {
    return this.getOne<Customer>(this.endpoint, id, customerResponseSchema);
  }

  // CREATE ONE
  createOneCustomer(customer: Customer): Observable<Customer> {
    return this.createOne<Customer>(this.endpoint, customer, this.element_i18nKey, customerResponseSchema);
  }

  // CREATE MULTIPLE
  createMultipleCustomer(customer: Customer[]): Observable<Customer[]> {
    return this.createMultiple<Customer>(this.endpoint, customer, this.element_i18nKey, customerResponseSchema);
  }

  // UPDATE ONE
  updateCustomerById(id: idTypes, customer: Customer): Observable<Customer> {
    return this.updateOne<Customer>(this.endpoint, customer, id, this.element_i18nKey, customerResponseSchema);
  }

  // UPDATE MULTIPLE
  updateMultipleCustomerById(id: idTypes[], customers: Customer[]): Observable<Customer[]> {
    return this.updateMultiple<Customer>(this.endpoint, customers, id, this.element_i18nKey, customerResponseSchema);
  }

  // DELETE ONE
  deleteCustomerById(id: idTypes): Observable<DeleteResponse> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey, deleteResponseSchema);
  }

  // DELETE ALL
  deleteAllCustomers(): Observable<DeleteResponse> {
    return this.deleteAll(this.endpoint, deleteResponseSchema);
  }
}
