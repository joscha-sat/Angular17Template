import { Injectable } from "@angular/core";
import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { ApiRoutes } from "../other/enums/api-routes";

import { catchError, map, Observable, of } from "rxjs";

import { Router } from "@angular/router";

import { NavRoutes } from "../other/enums/nav-routes";
import { environment } from "../other/environment/environment";
import { User } from "../other/models/User";
import { SuperAdminService } from "./super-admin.service";

export type LoginBody = {
  username: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})

/**
 * Service Class for the authentication functionality and api calls
 * allows access to the loggedInUser and the loggedIn flag
 */
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private loggedInUser!: User | null;
  private selectedTenantId!: string | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private superAdminService: SuperAdminService,
  ) {
  }

  /**
   * returns the loggedIn Status by checking if the access token and the refresh token are set in the local storage
   *
   */
  isLoggedIn(): boolean {
    return (
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("access_token") !== undefined &&
      localStorage.getItem("refresh_token") !== null &&
      localStorage.getItem("refresh_token") !== undefined
    );
  }

  /**
   * post the login data to the api
   * if the login is successful: the tokens are saved in the local storage, the user is saved in the service and an Observable of true is returned
   * otherwise: the loggedIn flag will be set to false and an Observable of false is returned
   * @param loginBody the login data containing the email and password
   */
  login(loginBody: LoginBody): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + ApiRoutes.AUTH + "/login", loginBody, {
        observe: "response",
      })
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Created) {
            this.setTokens(
              response.body?.access_token,
              response.body?.refresh_token,
            );
            this.setLoggedInUser(response.body?.user);
            return true;
          }
          return false;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  /**
   * Sends a request to the api to send a reset password mail to the given email
   * @param email the email to send the reset password mail to
   */
  sendResetPasswordMail(email: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.baseUrl + ApiRoutes.AUTH + "/resetPassword",
        { email: email },
        {
          observe: "response",
        },
      )
      .pipe(
        map((response) => {
          return response.status === HttpStatusCode.Created;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  validateResetPasswordHash(hash: string): Observable<boolean> {
    return this.http
      .get<any>(this.baseUrl + ApiRoutes.AUTH + "/validate/" + hash, {
        observe: "response",
      })
      .pipe(
        map((response) => {
          return response.status === HttpStatusCode.Ok;
        }),
      );
  }

  /**
   * Sends a request to the api to set the password of the user with the given hash from the reset password mail
   * @param passwordBody
   * @param hash
   */
  setPassword(
    passwordBody: string,
    hash: string,
  ): Observable<boolean> {
    return this.http
      .post<any>(
        this.baseUrl + ApiRoutes.AUTH + "/setPassword/" + hash,
        passwordBody,
        {
          observe: "response",
        },
      )
      .pipe(
        map((response) => {
          console.log(response);
          return response.status === HttpStatusCode.Created;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  resendInviteMail(userId: string) {
    const userBody = { userId: userId };

    return this.http.post(this.baseUrl + "auth/resendInviteMail", userBody);
  }

  /**
   * Logs out the user by removing the tokens from the local storage and navigating to the login page
   */
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.router.navigateByUrl(NavRoutes.LOGIN).then();
  }

  sendRefreshToken(): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + ApiRoutes.AUTH + "/refreshToken",
      {
        refreshToken: this.getRefreshToken(),
      },
    );
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  setTokens(access_token: string, refresh_token: string) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) {
      return this.loggedInUser;
    }
    const userJSON = localStorage.getItem("user");
    const parsedUser = JSON.parse(userJSON ?? "{}");
    return new User(parsedUser);
  }

  /**
   * @returns the tenant id of the logged-in user or the selected tenant id of the super admin
   */
  getTenantId() {
    if (this.superAdminService.isSuperAdmin()) {
      return this.superAdminService.getSelectedTenantId().value;
    } else {
      return this.getLoggedInUser()?.tenantId;
    }
  }
}
