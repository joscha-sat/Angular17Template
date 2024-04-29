import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GenericHttpService,
  idTypes,
  ResponseWithRecords,
} from './base-http.service';
import { Customer } from '../other/models/Customer';

type queryParams = {
  skip?: number;
  limit?: number;
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends GenericHttpService {
  endpoint = 'customer';
  element = 'Ein Kunde'; // deutschen Begriff mit Ein/e hier reinschreiben für snackbar

  // GET ALL
  getAllCustomers(
    queryParams?: queryParams,
  ): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>(this.endpoint, queryParams);
  }

  // GET ONE
  getCustomerById(id: string | number): Observable<Customer> {
    return this.getOne<Customer>(this.endpoint, id);
  }

  // CREATE ONE
  createOneCustomer(customer: Customer): Observable<Customer> {
    return this.createOne<Customer>(this.endpoint, customer, this.element);
  }

  // CREATE MULTIPLE
  createMultipleCustomer(customer: Customer[]): Observable<Customer[]> {
    return this.createMultiple<Customer>(this.endpoint, customer, this.element);
  }

  // UPDATE ONE
  updateCustomerById(id: idTypes, customer: Customer): Observable<Customer> {
    return this.updateOne<Customer>(this.endpoint, customer, id, this.element);
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
      this.element,
    );
  }

  // DELETE ONE
  deleteCustomerById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element);
  }

  // DELETE ALL
  deleteAllCustomers(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
