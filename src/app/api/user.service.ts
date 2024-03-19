import { Injectable } from "@angular/core";
import { ApiRoutes } from "../other/enums/api-routes";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GenericHttpService } from "./generic-http.service";
import { User } from "../other/models/User";
import { ResponseWithRecordsBody } from "../other/types/ResponseWithRecordsBody.type";

@Injectable({
  providedIn: "root",
})
export class UserService extends GenericHttpService {

  getUsers(queryParams?: any): Observable<ResponseWithRecordsBody> {
    return this.getAll(ApiRoutes.USER, queryParams)
  }

  getUserById(id: string): Observable<User> {
    return this.getOne<User>(ApiRoutes.USER, id)
  }

  createUser(user: User): Observable<User | User[] | null> {
    return this.create<User>(ApiRoutes.USER, user, 'User created', 'A new user has been successfully created.')
  }

  createGlobalUser(user: User): Observable<boolean> {
    return this.create<User>(ApiRoutes.USER, user, 'User created', 'A new general user has been successfully created.')
      .pipe(
        map(response => response !== null)
      );
  }

  updateUser(user: User, id: string): Observable<boolean> {
    return this.update<User>(ApiRoutes.USER, user, id, 'User updated', 'The user has been successfully updated.')
      .pipe(
        map(response => response !== null)
      );
  }

  deleteUser(id: string): Observable<boolean> {
    return this.deleteOne(ApiRoutes.USER, id, 'User deleted', 'The user has been successfully deleted.')
      .pipe(
        map(response => response !== null)
      );
  }
}
