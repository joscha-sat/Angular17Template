import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
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
  element = "Eine Firma"

  getAllTenants(queryParams?: queryParams): Observable<ResponseWithRecords<Tenant>> {
    return this.getAll<Tenant>(this.endpoint, queryParams);
  }

  getOneTenant(id: string | number) {
    return this.getOne<Tenant>(this.endpoint, id);
  }

  createTenant(tenant: Tenant | Tenant[]): Observable<Tenant | Tenant[] | null> {
    return this.create<Tenant>(this.endpoint, tenant, this.element);
  }

  updateTenant(tenant: Tenant | Tenant[], id: idTypes): Observable<Tenant | Tenant[] | null> {
    return this.update<Tenant>(this.endpoint, tenant, id, this.element);
  }

  deleteOneTenant(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element);
  }

  deleteAllTenants(): Observable<unknown> {
    return this.deleteAll<Tenant>(this.endpoint);
  }
}
