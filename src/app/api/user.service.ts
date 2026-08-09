import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  type BaseQueryParameters,
  GenericHttpService,
  type idTypes,
  type ResponseWithRecords,
} from './base-http-service/base-http.service';
import type { User } from '../models/User';
import { ApiRoutes } from '../other/enums/api-routes';
import { type EmptyDeleteResponse, emptyDeleteResponseSchema } from './schemas/common.schemas';
import { userListResponseSchema, userResponseSchema } from './schemas/resource.schemas';

type QueryParameters = BaseQueryParameters;

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericHttpService {
  endpoint: ApiRoutes = ApiRoutes.USER;
  element_i18nKey: string = 'user.a_title';

  // GET ALL
  getAllUsers(queryParameters?: QueryParameters): Observable<ResponseWithRecords<User>> {
    return this.getAll<User>(this.endpoint, queryParameters, userListResponseSchema);
  }

  // GET ONE
  getUserById(id: string | number): Observable<User> {
    return this.getOne<User>(this.endpoint, id, userResponseSchema);
  }

  // CREATE ONE
  createOneUser(user: User): Observable<User> {
    return this.createOne<User>(this.endpoint, user, this.element_i18nKey, userResponseSchema);
  }

  // CREATE MULTIPLE
  createMultipleUser(user: User[]): Observable<User[]> {
    return this.createMultiple<User>(this.endpoint, user, this.element_i18nKey, userResponseSchema);
  }

  // UPDATE ONE
  updateUserById(id: idTypes, user: User): Observable<User> {
    return this.updateOne<User>(this.endpoint, user, id, this.element_i18nKey, userResponseSchema);
  }

  // UPDATE MULTIPLE
  updateMultipleUserById(id: idTypes[], users: User[]): Observable<User[]> {
    return this.updateMultiple<User>(this.endpoint, users, id, this.element_i18nKey, userResponseSchema);
  }

  // DELETE ONE
  deleteUserById(id: idTypes): Observable<EmptyDeleteResponse> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey, emptyDeleteResponseSchema);
  }

  // DELETE ALL
  deleteAllUsers(): Observable<EmptyDeleteResponse> {
    return this.deleteAll(this.endpoint, emptyDeleteResponseSchema);
  }
}
