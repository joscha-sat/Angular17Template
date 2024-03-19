import { Injectable, signal } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { Tenant } from "../other/models/Tenant";
import { GenericHttpService, idTypes, ResponseWithRecords } from "./generic-http.service";

type queryParams = {
  limit?: number;
  skip?: number;

  name?: string;
  sort?: string;
}

@Injectable({
  providedIn: "root",
})
/**
 * Service Class for the getting or manipulating tenant data
 */
export class TenantService extends GenericHttpService {
  selectedTenantId = signal('be9733b2-7695-4a41-96ed-9c0fcb2772dd');
  search = signal('');
  endpoint = 'tenant';
  private _refreshTenants = new Subject<void>();
  public refreshTenants$ = this._refreshTenants.asObservable();

  getAllTenants(queryParams?: queryParams): Observable<ResponseWithRecords<Tenant>> {
    return this.getAll<Tenant>(this.endpoint, queryParams);
  }

  createTenant(tenant: Tenant | Tenant[]): Observable<Tenant | Tenant[] | null> {
    return this.create<Tenant>(this.endpoint, tenant).pipe(
      tap(() => this._refreshTenants.next())
    );
  }

  updateTenant(tenant: Tenant | Tenant[], id: idTypes): Observable<Tenant | Tenant[] | null> {
    return this.update<Tenant>(this.endpoint, tenant, id).pipe(
      tap(() => this._refreshTenants.next())
    );
  }

  deleteOneTenant(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id).pipe(
      tap(() => this._refreshTenants.next())
    );
  }

  deleteAllTenants(): Observable<unknown> {
    return this.deleteAll<Tenant>(this.endpoint).pipe(
      tap(() => this._refreshTenants.next())
    );
  }
}
