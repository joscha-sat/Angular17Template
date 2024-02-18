import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { Customer } from '../other/models/Customer';
import { environment } from "../other/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers = signal<Customer[]>([]);
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  // ------------------------------------------------------------------------------------- || Methods ||

  // ADD ONE Customer
  addCustomer(addCustomerObject: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(this.baseUrl + 'customer', addCustomerObject)
      .pipe(take(1), tap(() => this.getAllCustomers().subscribe()));
  }

  // GET ALL Customers
  getAllCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.baseUrl + 'customer')
      .pipe((take(1), tap((response: Customer[]) => this.customers.set(response.map((customer: Customer) => new Customer(customer))))));
  }

  // GET ONE Customer BY ID
  getCustomerById(id: string | number): Observable<Customer> {
    return this.http
      .get<Customer>(this.baseUrl + 'customer/' + id)
      .pipe((take(1), tap(() => this.getAllCustomers().subscribe())));
  }

  // CHANGE ONE Customer BY ID
  updateCustomerById(id: string | number, updateCustomerObject: Customer): Observable<Customer> {
    return this.http
      .patch<Customer>(this.baseUrl + 'customer/' + id, updateCustomerObject)
      .pipe((take(1), tap(() => this.getAllCustomers().subscribe())));
  }

  // DELETE ONE Customer BY ID
  deleteCustomerById(id: number | string): Observable<unknown> {
    return this.http
      .delete<unknown>(this.baseUrl + 'customer/' + id)
      .pipe((take(1), tap(() => this.getAllCustomers().subscribe())));
  }

  // DELETE ALL Customer
  deleteAllCustomers(): Observable<unknown> {
    return this.http
      .delete<unknown>(this.baseUrl + 'customer/')
      .pipe((take(1), tap(() => this.getAllCustomers().subscribe())));
  }
}
