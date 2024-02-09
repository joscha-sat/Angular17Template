import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams, HttpStatusCode } from "@angular/common/http";
import { ApiRoutes } from "../enums/api-routes";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../environment/environment";
import { ResponseWithRecordsBody } from "../types/ResponseWithRecordsBody.type";
import { Tenant } from "../models/Tenant";
import { TenantQueryParams } from "../types/TenantQueryParams.type";


@Injectable({
  providedIn: "root",
})
/**
 * Service Class for the getting or manipulating tenant data
 */
export class TenantService {
  private readonly baseUrl = environment.baseUrl;

  selectedTenantId = signal<string>('');

  constructor(private http: HttpClient) {
  }

  /**
   * get the tenant data from the api
   * sets query params for the api call if they are passed in
   * sets the totalAmount property of the parent PaginationFilterService if data is returned
   * maps the response to an array of observable user objects with the Tenant.fromJson method
   * @param queryParams optional query params for the api call
   */
  getTenants(queryParams?: TenantQueryParams): Observable<Tenant[]> {
    let params: HttpParams = new HttpParams();

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      }
    }

    // TODO: pagination
    // params = params
    //   .set(this.sort !== undefined ? "sort" : "", this.sort ?? "")
    //   .set(this.endIndex !== "" ? "limit" : "", this.endIndex)
    //   .set(this.startIndex !== "" ? "skip" : "", this.startIndex);

    return this.http
      .get<ResponseWithRecordsBody>(this.baseUrl + ApiRoutes.TENANT, { params })
      .pipe(
        map((response) => {
          return response.records.map((tenant: Tenant) => {
            return new Tenant(tenant);
          });
        }),
      );
  }

  /**
   * get detailed tenant data from the api with a tenant
   * maps the response to a tenant object with the Tenant.fromJson method
   * @param id the id of the tenant to get
   */
  getTenantById(id: string): Observable<Tenant> {
    return this.http.get<any>(this.baseUrl + ApiRoutes.TENANT + "/" + id).pipe(
      map((tenant: Tenant) => {
        return new Tenant(tenant);
      }),
    );
  }

  /**
   * Creates a new tenant with a post request to the api
   * @param tenantBody the tenant body to create the tenant containing the name
   * */
  createTenant(tenantBody: Tenant): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + ApiRoutes.TENANT, tenantBody, {
        observe: "response",
      })
      .pipe(
        map((response) => {
          return response.status === HttpStatusCode.Ok;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  /**
   * Updates a tenant with a patch request to the api by id
   *
   * @param tenantId the id of the tenant to patch
   * @param tenantBody
   */
  updateTenant(tenantId: string, tenantBody: Tenant): Observable<boolean> {
    return this.http
      .patch<any>(
        this.baseUrl + ApiRoutes.TENANT + "/" + tenantId,
        tenantBody,
        {
          observe: "response",
        },
      )
      .pipe(
        map((response) => {
          return response.status === HttpStatusCode.Ok;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }
}
