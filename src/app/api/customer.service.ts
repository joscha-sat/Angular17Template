import { Injectable } from '@angular/core';
import { GenericHttpService, idTypes, ResponseWithRecords } from "./generic-http.service";
import { Observable } from 'rxjs';
import { Customer } from '../other/models/Customer';


type queryParams = {
  skip?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends GenericHttpService {
  endpoint = 'customers';
  element = 'Ein Kunde';

  getAllCustomers(queryParams?: queryParams): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>(this.endpoint, queryParams);
  }

  getOneCustomers(id: string | number): Observable<Customer> {
    return this.getOne<Customer>(this.endpoint, id);
  }

  createCustomer(customer: Customer | Customer[]): Observable<Customer | Customer[] | null> {
    return this.create<Customer>(this.endpoint, customer, this.element)
  }

  updateCustomer(customer: Customer | Customer[], id: idTypes): Observable<Customer | Customer[] | null> {
    return this.update<Customer>(this.endpoint, customer, id, this.element)
  }

  deleteOneCustomer(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element)
  }

  deleteAllCustomers(): Observable<Customer | Customer[] | null> {
    return this.deleteAll<Customer>(this.endpoint)
  }
}
