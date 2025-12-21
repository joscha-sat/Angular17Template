import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseQueryParams,
  GenericHttpService,
  idTypes,
  ResponseWithRecords,
} from './base-http-service/base-http.service';
import { Role } from '../models/Role';
import { AuthService } from './auth.service';
import { ApiRoutes } from '../other/enums/api_routes';
import { User } from '../models/User';

export type RoleQueryParams = BaseQueryParams & {};

@Injectable({
  providedIn: 'root',
})
export class RoleService extends GenericHttpService {
  authService: AuthService = inject(AuthService);

  endpoint: ApiRoutes = ApiRoutes.ROLE;
  element_i18nKey: string = 'role.a_title';

  //  UTILITY METHODS
  get isSuperAdmin(): boolean {
    const user: User | null = this.authService.getLoggedInUser();

    if (!user?.role) {
      return false;
    }
    return user.role.superAdmin;
  }

  // GET ALL
  getAllRoles(
    queryParams?: RoleQueryParams,
  ): Observable<ResponseWithRecords<Role>> {
    return this.getAll<Role>(this.endpoint, queryParams, Role);
  }

  // GET ONE Role
  getRoleById(id: string | number): Observable<Role> {
    return this.getOne<Role>(this.endpoint, id, Role);
  }

  // CREATE ONE Role
  createOneRole(role: Role): Observable<Role> {
    return this.createOne<Role>(this.endpoint, role, this.element_i18nKey);
  }

  // CREATE MULTIPLE Roles
  createMultipleRole(role: Role[]): Observable<Role[]> {
    return this.createMultiple<Role>(this.endpoint, role, this.element_i18nKey);
  }

  // UPDATE ONE Role
  updateRoleById(id: idTypes, role: Role): Observable<Role> {
    return this.updateOne<Role>(this.endpoint, role, id, this.element_i18nKey);
  }

  // UPDATE MULTIPLE Roles
  updateMultipleRoleById(id: idTypes[], roles: Role[]): Observable<Role[]> {
    return this.updateMultiple<Role>(
      this.endpoint,
      roles,
      id,
      this.element_i18nKey,
    );
  }

  // DELETE ONE Role
  deleteRoleById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey);
  }

  // DELETE ALL Roles
  deleteAllRoles(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
