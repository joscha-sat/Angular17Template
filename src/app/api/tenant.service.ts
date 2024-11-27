import { Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';
import {
  BaseQueryParams,
  GenericHttpService,
  idTypes,
  ResponseWithRecords,
} from './base-http-service/base-http.service';
import { Tenant } from '../other/models/Tenant';
import { ApiRoutes } from '../other/enums/api_routes';

export type TenantQueryParams = BaseQueryParams & {};

@Injectable({
  providedIn: 'root',
})
export class TenantService extends GenericHttpService {
  selectedTenantId = signal('be9733b2-7695-4a41-96ed-9c0fcb2772dd');

  endpoint = ApiRoutes.TENANT;
  element = 'Eine Firma'; // deutschen Begriff mit Ein/e hier reinschreiben für snackbar

  // GET ALL
  getAllTenants(
    queryParams?: TenantQueryParams,
  ): Observable<ResponseWithRecords<Tenant>> {
    return this.getAll<Tenant>(this.endpoint, queryParams);
  }

  // GET ONE Tenant
  getTenantById(id: string | number): Observable<Tenant> {
    return this.getOne<Tenant>(this.endpoint, id);
  }

  // CREATE ONE Tenant
  createOneTenant(tenant: Tenant): Observable<Tenant> {
    return this.createOne<Tenant>(this.endpoint, tenant, this.element);
  }

  // CREATE MULTIPLE Tenants
  createMultipleTenant(tenant: Tenant[]): Observable<Tenant[]> {
    return this.createMultiple<Tenant>(this.endpoint, tenant, this.element);
  }

  // UPDATE ONE Tenant
  updateTenantById(id: idTypes, tenant: Tenant): Observable<Tenant> {
    return this.updateOne<Tenant>(this.endpoint, tenant, id, this.element);
  }

  // UPDATE MULTIPLE Tenants
  updateMultipleTenantById(
    id: idTypes[],
    tenants: Tenant[],
  ): Observable<Tenant[]> {
    return this.updateMultiple<Tenant>(
      this.endpoint,
      tenants,
      id,
      this.element,
    );
  }

  // DELETE ONE Tenant
  deleteTenantById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element);
  }

  // DELETE ALL Tenants
  deleteAllTenants(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
