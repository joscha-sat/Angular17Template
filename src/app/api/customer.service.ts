import { Injectable } from '@angular/core';
import { GenericHttpService, idTypes, ResponseWithRecords } from "./generic-http.service";
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from "../other/models/Customer";


type queryParams = {
  skip?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends GenericHttpService {
  endpoint = 'customer';
  element = "Ein Kunde"
  private _refreshCustomers = new Subject<void>();
  public refreshCustomers$ = this._refreshCustomers.asObservable();

  getAllCustomers(queryParams?: queryParams): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>(this.endpoint, queryParams);
  }

  createCustomer(customer: Customer | Customer[]): Observable<Customer | Customer[] | null> {
    return this.create<Customer>(this.endpoint, customer, this.element).pipe(
      tap(() => this._refreshCustomers.next())
    );
  }

  updateCustomer(customer: Customer | Customer[], id: idTypes): Observable<Customer | Customer[] | null> {
    return this.update<Customer>(this.endpoint, customer, id, this.element).pipe(
      tap(() => this._refreshCustomers.next())
    );
  }

  deleteOneCustomer(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element).pipe(
      tap(() => this._refreshCustomers.next())
    );
  }

  deleteAllCustomers(): Observable<Customer | Customer[] | null> {
    return this.deleteAll<Customer>(this.endpoint).pipe(
      tap(() => this._refreshCustomers.next())
    );
  }
}
