import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpStatusCode } from "@angular/common/http";
import { ApiRoutes } from "../other/enums/api-routes";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../other/environment/environment";
import { User } from "../other/models/User";
import { ResponseWithRecordsBody } from "../other/types/ResponseWithRecordsBody.type";
import { UserQueryParams } from "../other/types/UserQueryParams.type";

@Injectable({
  providedIn: "root",
})
/**
 * Service Class for the getting or manipulating user data
 */
export class UserService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * get the user data from the api
   * sets query params for the api call if they are passed in
   * sets the totalAmount property of the parent PaginationFilterService if data is returned
   * maps the response to an array of observable user objects with the User.fromJson method
   * @param queryParams optional query params for the api call
   */
  getUsers(queryParams?: UserQueryParams): Observable<User[]> {
    let params: HttpParams = new HttpParams();

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      }
    }

    // TODO: pagination
    // params = params
    //   .set(this.sort !== undefined ? "sort" : "", this.sort ?? "")
    //   .set(this.endIndex !== "" ? "limit" : "", this.endIndex)
    //   .set(this.startIndex !== "" ? "skip" : "", this.startIndex);

    return this.http
      .get<ResponseWithRecordsBody>(this.baseUrl + ApiRoutes.USER, { params })
      .pipe(
        map((response) => {
          return response.records.map((user: User) => {
            return new User(user);
          });
        }),
      );
  }

  /**
   * get detailed user data from the api with a user id
   * @param id the id of the user to get
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<any>(this.baseUrl + ApiRoutes.USER + "/" + id).pipe(
      map((user: User) => {
        return new User(user);
      }),
    );
  }

  /**
   * Sends a request to the api to create a new user
   * @param user the user to create as UserBody
   */
  createUser(user: User): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + ApiRoutes.USER, user, {
        observe: "response",
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

  createGlobalUser(globalUser: User): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + ApiRoutes.USER, globalUser, {
        observe: "response",
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
   * Sends a request to the api to patch a user
   * @param user the user to update as UserBody
   * @param id the id of the user to update
   */
  updateUser(user: User, id: string): Observable<boolean> {
    return this.http
      .patch<any>(this.baseUrl + ApiRoutes.USER + "/" + id, user, {
        observe: "response",
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
   * Deletes a user from the API
   * @param id the id of the user to delete
   * @returns true if the user was deleted successfully, false if not
   */
  deleteUser(id: string): Observable<boolean> {
    return this.http
      .delete<any>(this.baseUrl + ApiRoutes.USER + "/" + id, {
        observe: "response",
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
