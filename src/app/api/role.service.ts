import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { ApiRoutes } from '../enums/api-routes';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Service Class for the getting or manipulating tenant data
 */
export class RoleService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * get the role data from the api
   * sets query params for the api call if they are passed in
   * sets the totalAmount property of the parent PaginationFilterService if data is returned
   * maps the response to an array of observable user objects with the Role.fromJson method
   * @param queryParams optional query params for the api call
   */
  getRoles(queryParams?: RoleQueryParams): Observable<Role[]> {
    const params: HttpParams = new HttpParams()
      .set(
        queryParams?.tenantId !== undefined ? 'tenantId' : '',
        queryParams?.tenantId ?? '',
      )
      .set(
        queryParams?.draft !== undefined ? 'draft' : '',
        queryParams?.draft?.toString() ?? '',
      )
      .set(
        queryParams?.global !== undefined ? 'global' : '',
        queryParams?.global?.toString() ?? '',
      )
      .set(
        queryParams?.superAdmin !== undefined ? 'superAdmin' : '',
        queryParams?.superAdmin?.toString() ?? '',
      )
      .set(
        queryParams?.name !== undefined ? 'name' : '',
        queryParams?.name ?? '',
      )
      .set(
        queryParams?.sort !== undefined ? 'sort' : '',
        queryParams?.sort ?? '',
      )
      .set(
        queryParams?.limit !== undefined ? 'limit' : '',
        queryParams?.limit?.toString() ?? '',
      )
      .set(
        queryParams?.skip !== undefined ? 'skip' : '',
        queryParams?.skip?.toString() ?? '',
      );

    return this.http
      .get<ResponseWithRecordsBody>(this.baseUrl + ApiRoutes.ROLE, { params })
      .pipe(
        map((response) => {
          return response.records.map((role: Role) => {
            return new Role(role);
          });
        }),
      );
  }

  /**
   * get detailed role data from the api with a role id
   * maps the response to an observable role object with the Role.fromJson method
   * @param id the id of the role to get
   */
  getRoleById(id: number) {
    this.http.get<any>(this.baseUrl + ApiRoutes.ROLE + '/' + id).pipe(
      map((role: Role) => {
        return new Role(role);
      }),
    );
  }

  /**
   * Sends a request to the api to create a new role
   * @param roleBody the role to create as RoleBody
   */
  createRole(roleBody: RoleBody): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + ApiRoutes.ROLE, roleBody, {
        observe: 'response',
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
   *  Sends a patch request to the api to update a role
   *  @param roleEvent the role to update as RoleBody
   */
  updateRole(roleEvent: RoleEvent): Observable<boolean> {
    return this.http
      .patch<any>(
        this.baseUrl + ApiRoutes.ROLE + '/' + roleEvent.roleId,
        roleEvent.roleBody,
        {
          observe: 'response',
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

  /**
   *  Sends a delete request to the api to delete a role
   *  @param id the id of the role to delete
   */
  deleteRole(id: string): Observable<boolean> {
    return this.http
      .delete<any>(this.baseUrl + ApiRoutes.ROLE + '/' + id, {
        observe: 'response',
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
}
