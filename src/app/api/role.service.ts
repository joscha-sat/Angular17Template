import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  type BaseQueryParameters,
  GenericHttpService,
  type idTypes,
  type ResponseWithRecords,
} from './base-http-service/base-http.service';
import type { Role } from '../models/Role';
import { AuthService } from './auth.service';
import { ApiRoutes } from '../other/enums/api-routes';
import type { User } from '../models/User';
import { type EmptyDeleteResponse, emptyDeleteResponseSchema } from './schemas/common.schemas';
import { roleListResponseSchema, roleResponseSchema } from './schemas/resource.schemas';

export type RoleQueryParameters = BaseQueryParameters;

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
  getAllRoles(queryParameters?: RoleQueryParameters): Observable<ResponseWithRecords<Role>> {
    return this.getAll<Role>(this.endpoint, queryParameters, roleListResponseSchema);
  }

  // GET ONE Role
  getRoleById(id: string | number): Observable<Role> {
    return this.getOne<Role>(this.endpoint, id, roleResponseSchema);
  }

  // CREATE ONE Role
  createOneRole(role: Role): Observable<Role> {
    return this.createOne<Role>(this.endpoint, role, this.element_i18nKey, roleResponseSchema);
  }

  // CREATE MULTIPLE Roles
  createMultipleRole(role: Role[]): Observable<Role[]> {
    return this.createMultiple<Role>(this.endpoint, role, this.element_i18nKey, roleResponseSchema);
  }

  // UPDATE ONE Role
  updateRoleById(id: idTypes, role: Role): Observable<Role> {
    return this.updateOne<Role>(this.endpoint, role, id, this.element_i18nKey, roleResponseSchema);
  }

  // UPDATE MULTIPLE Roles
  updateMultipleRoleById(id: idTypes[], roles: Role[]): Observable<Role[]> {
    return this.updateMultiple<Role>(this.endpoint, roles, id, this.element_i18nKey, roleResponseSchema);
  }

  // DELETE ONE Role
  deleteRoleById(id: idTypes): Observable<EmptyDeleteResponse> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey, emptyDeleteResponseSchema);
  }

  // DELETE ALL Roles
  deleteAllRoles(): Observable<EmptyDeleteResponse> {
    return this.deleteAll(this.endpoint, emptyDeleteResponseSchema);
  }
}
