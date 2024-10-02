import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseQueryParams,
  GenericHttpService,
  idTypes,
  ResponseWithRecords,
} from './base-http-service/base-http.service';
import { Role } from '../other/models/Role';
import { AuthService } from './auth.service';

export type RoleQueryParams = BaseQueryParams & {};

@Injectable({
  providedIn: 'root',
})
export class RoleService extends GenericHttpService {
  authService = inject(AuthService);

  endpoint = 'role';
  element = 'Eine Rolle'; // deutschen Begriff mit Ein/e hier reinschreiben für snackbar

  //  UTILITY METHODS
  get isSuperAdmin(): boolean {
    const user = this.authService.getLoggedInUser();

    if (!user?.role) {
      return false;
    }
    return user.role.superAdmin;
  }

  // GET ALL
  getAllRoles(
    queryParams?: RoleQueryParams,
  ): Observable<ResponseWithRecords<Role>> {
    return this.getAll<Role>(this.endpoint, queryParams);
  }

  // GET ONE Role
  getRoleById(id: string | number): Observable<Role> {
    return this.getOne<Role>(this.endpoint, id);
  }

  // CREATE ONE Role
  createOneRole(role: Role): Observable<Role> {
    return this.createOne<Role>(this.endpoint, role, this.element);
  }

  // CREATE MULTIPLE Roles
  createMultipleRole(role: Role[]): Observable<Role[]> {
    return this.createMultiple<Role>(this.endpoint, role, this.element);
  }

  // UPDATE ONE Role
  updateRoleById(id: idTypes, role: Role): Observable<Role> {
    return this.updateOne<Role>(this.endpoint, role, id, this.element);
  }

  // UPDATE MULTIPLE Roles
  updateMultipleRoleById(id: idTypes[], roles: Role[]): Observable<Role[]> {
    return this.updateMultiple<Role>(this.endpoint, roles, id, this.element);
  }

  // DELETE ONE Role
  deleteRoleById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element);
  }

  // DELETE ALL Roles
  deleteAllRoles(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
