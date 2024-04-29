import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GenericHttpService,
  idTypes,
  ResponseWithRecords,
} from './base-http.service';
import { User } from '../other/models/User';

type queryParams = {
  skip?: number;
  limit?: number;
};

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericHttpService {
  endpoint = 'user';
  element = 'Ein Nutzer'; // deutschen Begriff mit Ein/e hier reinschreiben für snackbar
  search = signal('');

  // GET ALL
  getAllUsers(
    queryParams?: queryParams,
  ): Observable<ResponseWithRecords<User>> {
    return this.getAll<User>(this.endpoint, queryParams);
  }

  // GET ONE
  getUserById(id: string | number): Observable<User> {
    return this.getOne<User>(this.endpoint, id);
  }

  // CREATE ONE
  createOneUser(user: User): Observable<User> {
    return this.createOne<User>(this.endpoint, user, this.element);
  }

  // CREATE MULTIPLE
  createMultipleUser(user: User[]): Observable<User[]> {
    return this.createMultiple<User>(this.endpoint, user, this.element);
  }

  // UPDATE ONE
  updateUserById(id: idTypes, user: User): Observable<User> {
    return this.updateOne<User>(this.endpoint, user, id, this.element);
  }

  // UPDATE MULTIPLE
  updateMultipleUserById(id: idTypes[], users: User[]): Observable<User[]> {
    return this.updateMultiple<User>(this.endpoint, users, id, this.element);
  }

  // DELETE ONE
  deleteUserById(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element);
  }

  // DELETE ALL
  deleteAllUsers(): Observable<unknown> {
    return this.deleteAll<unknown>(this.endpoint);
  }
}
