import { Injectable, signal, type WritableSignal } from '@angular/core';

import type { Observable } from 'rxjs';
import {
  type BaseQueryParams,
  GenericHttpService,
  type idTypes,
  type ResponseWithRecords,
} from './base-http-service/base-http.service';
import type { Tenant } from '../models/Tenant';
import { ApiRoutes } from '../other/enums/api_routes';
import { type EmptyDeleteResponse, emptyDeleteResponseSchema } from './schemas/common.schemas';
import { tenantListResponseSchema, tenantResponseSchema } from './schemas/resource.schemas';

export type TenantQueryParams = BaseQueryParams & {};

@Injectable({
  providedIn: 'root',
})
export class TenantService extends GenericHttpService {
  readonly selectedTenantId: WritableSignal<string> = signal('be9733b2-7695-4a41-96ed-9c0fcb2772dd');
  endpoint: ApiRoutes = ApiRoutes.TENANT;
  element_i18nKey: string = 'tenant.a_title';

  // GET ALL > Tenants
  getAllTenants(queryParams?: TenantQueryParams): Observable<ResponseWithRecords<Tenant>> {
    return this.getAll<Tenant>(this.endpoint, queryParams, tenantListResponseSchema);
  }

  // GET ONE > Tenant
  getTenantById(id: string | number): Observable<Tenant> {
    return this.getOne<Tenant>(this.endpoint, id, tenantResponseSchema);
  }

  // CREATE ONE > Tenant
  createOneTenant(tenant: Tenant): Observable<Tenant> {
    return this.createOne<Tenant>(this.endpoint, tenant, this.element_i18nKey, tenantResponseSchema);
  }

  // CREATE MULTIPLE > Tenants
  createMultipleTenant(tenant: Tenant[]): Observable<Tenant[]> {
    return this.createMultiple<Tenant>(this.endpoint, tenant, this.element_i18nKey, tenantResponseSchema);
  }

  // PATCH / UPDATE ONE > Tenant
  updateTenantById(id: idTypes, tenant: Tenant): Observable<Tenant> {
    return this.updateOne<Tenant>(this.endpoint, tenant, id, this.element_i18nKey, tenantResponseSchema);
  }

  // UPDATE MULTIPLE > Tenants
  updateMultipleTenantById(id: idTypes[], tenants: Tenant[]): Observable<Tenant[]> {
    return this.updateMultiple<Tenant>(this.endpoint, tenants, id, this.element_i18nKey, tenantResponseSchema);
  }

  // DELETE ONE > Tenant
  deleteTenantById(id: idTypes): Observable<EmptyDeleteResponse> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey, emptyDeleteResponseSchema);
  }

  // DELETE ALL > Tenants
  deleteAllTenants(): Observable<EmptyDeleteResponse> {
    return this.deleteAll(this.endpoint, emptyDeleteResponseSchema);
  }
}
