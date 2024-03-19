import { Injectable } from '@angular/core';
import { Customer } from '../other/models/Customer';
import { GenericHttpService, ResponseWithRecords } from "./generic-http.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends GenericHttpService {
  element = "ein Kunde"
  private readonly endpoint = 'customer';

  // ADD ONE Customer
  addCustomer(addCustomerObject: Customer): Observable<Customer | Customer[] | null> {
    return this.create<Customer>(this.endpoint, addCustomerObject, this.element);
  }

  // GET ALL Customers
  getAllCustomers(): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>(this.endpoint);
  }

  // GET ONE Customer BY ID
  getCustomerById(id: string | number): Observable<Customer> {
    return this.getOne<Customer>(this.endpoint, id);
  }

  // UPDATE ONE Customer BY ID
  updateCustomerById(id: string | number, updateCustomerObject: Customer): Observable<Customer | Customer[] | null> {
    return this.update<Customer>(this.endpoint, updateCustomerObject, id, this.element);
  }

  // DELETE ONE Customer BY ID
  deleteCustomerById(id: number | string): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element);
  }

  // DELETE ALL Customers
  deleteAllCustomers(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
