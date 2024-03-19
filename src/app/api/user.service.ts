import { Injectable } from '@angular/core';
import { GenericHttpService, idTypes, ResponseWithRecords } from "./generic-http.service";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../other/models/User';

type queryParams = {
  limit?: number;
  skip?: number;

  tenantId?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  sort?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericHttpService {
  endpoint = 'user';
  element = "Nutzer"

  getAllUsers(queryParams?: queryParams): Observable<ResponseWithRecords<User>> {
    return this.getAll<User>(this.endpoint, queryParams);
  }

  getOneUser(id: string | number) {
    return this.getOne<User>(this.endpoint, id)
  }

  createUser(user: User | User[]): Observable<User | User[] | null> {
    return this.create<User>(this.endpoint, user, this.element).pipe(
      tap(() => this._refreshObservable.next())
    );
  }

  updateUser(user: User | User[], id: idTypes): Observable<User | User[] | null> {
    return this.update<User>(this.endpoint, user, id, this.element).pipe(
      tap(() => this._refreshObservable.next())
    );
  }

  deleteOneUser(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id, this.element).pipe(
      tap(() => this._refreshObservable.next())
    );
  }

  deleteAllUsers(): Observable<User | User[] | null> {
    return this.deleteAll<User>(this.endpoint).pipe(
      tap(() => this._refreshObservable.next())
    );
  }
}
