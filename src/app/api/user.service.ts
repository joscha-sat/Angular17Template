import { Injectable } from '@angular/core';
import { GenericHttpService, idTypes, ResponseWithRecords } from "./generic-http.service";
import { Observable, Subject } from 'rxjs';
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
  private _refreshUsers = new Subject<void>();
  public refreshUsers$ = this._refreshUsers.asObservable();

  getAllUsers(queryParams?: queryParams): Observable<ResponseWithRecords<User>> {
    return this.getAll<User>(this.endpoint, queryParams);
  }

  createUser(user: User | User[]): Observable<User | User[] | null> {
    return this.create<User>(this.endpoint, user, "Erfolgreich!", "Ein Benutzer wurde erstellt!").pipe(
      tap(() => this._refreshUsers.next())
    );
  }

  updateUser(user: User | User[], id: idTypes): Observable<User | User[] | null> {
    return this.update<User>(this.endpoint, user, id).pipe(
      tap(() => this._refreshUsers.next())
    );
  }

  deleteOneUser(id: idTypes): Observable<unknown> {
    return this.deleteOne(this.endpoint, id).pipe(
      tap(() => this._refreshUsers.next())
    );
  }

  deleteAllUsers(): Observable<User | User[] | null> {
    return this.deleteAll<User>(this.endpoint).pipe(
      tap(() => this._refreshUsers.next())
    );
  }
}
