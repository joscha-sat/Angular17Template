import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseQueryParams,
  GenericHttpService,
  idTypes,
  ResponseWithRecords,
} from './base-http-service/base-http.service';
import { User } from '../other/models/User';
import { ApiRoutes } from '../other/enums/api_routes';

type QueryParams = BaseQueryParams;

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericHttpService {
  endpoint = ApiRoutes.USER;
  element_i18nKey = 'user.a_title';

  // GET ALL
  getAllUsers(
    queryParams?: QueryParams,
  ): Observable<ResponseWithRecords<User>> {
    return this.getAll<User>(this.endpoint, queryParams);
  }

  // GET ONE
  getUserById(id: string | number): Observable<User> {
    return this.getOne<User>(this.endpoint, id);
  }

  // CREATE ONE
  createOneUser(user: User): Observable<User> {
    return this.createOne<User>(this.endpoint, user, this.element_i18nKey);
  }

  // CREATE MULTIPLE
  createMultipleUser(user: User[]): Observable<User[]> {
    return this.createMultiple<User>(this.endpoint, user, this.element_i18nKey);
  }

  // UPDATE ONE
  updateUserById(id: idTypes, user: User): Observable<User> {
    return this.updateOne<User>(this.endpoint, user, id, this.element_i18nKey);
  }

  // UPDATE MULTIPLE
  updateMultipleUserById(id: idTypes[], users: User[]): Observable<User[]> {
    return this.updateMultiple<User>(
      this.endpoint,
      users,
      id,
      this.element_i18nKey,
    );
  }

  // DELETE ONE
  deleteUserById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element_i18nKey);
  }

  // DELETE ALL
  deleteAllUsers(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
