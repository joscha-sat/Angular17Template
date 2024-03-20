import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { ApiRoutes } from '../other/enums/api-routes';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NavRoutes } from '../other/enums/nav-routes';
import { environment } from '../other/environment/environment';
import { User } from '../other/models/User';
import { SuperAdminService } from './super-admin.service';

const STORAGE_ACCESS_TOKEN_KEY = 'access_token';
const STORAGE_REFRESH_TOKEN_KEY = 'refresh_token';
const STORAGE_USER_KEY = 'user';

export type LoginBody = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private loggedInUser!: User | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private superAdminService: SuperAdminService,
  ) {}

  isLoggedIn(): boolean {
    return (
      this.getFromLocalStorage(STORAGE_ACCESS_TOKEN_KEY) !== null &&
      this.getFromLocalStorage(STORAGE_REFRESH_TOKEN_KEY) !== null
    );
  }

  login(loginBody: LoginBody): Observable<boolean> {
    return this.http
      .post<any>(
        this.baseUrl + NavRoutes.AUTH + '/' + NavRoutes.LOGIN,
        loginBody,
        { observe: 'response' },
      )
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

  sendResetPasswordMail(email: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.buildUrl(ApiRoutes.AUTH, 'resetPassword'),
        { email: email },
        {
          observe: 'response',
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
      .get<any>(this.buildUrl(ApiRoutes.AUTH, 'validate', hash), {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.status === HttpStatusCode.Ok;
        }),
      );
  }

  setPassword(passwordBody: string, hash: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.buildUrl(ApiRoutes.AUTH, 'setPassword', hash),
        passwordBody,
        {
          observe: 'response',
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
    return this.http.post(this.buildUrl('auth', 'resendInviteMail'), userBody);
  }

  logout() {
    this.loggedInUser = null;
    this.removeFromLocalStorage(STORAGE_USER_KEY);
    this.removeFromLocalStorage(STORAGE_ACCESS_TOKEN_KEY);
    this.removeFromLocalStorage(STORAGE_REFRESH_TOKEN_KEY);
    this.router.navigateByUrl(NavRoutes.LOGIN).then();
  }

  sendRefreshToken(): Observable<any> {
    return this.http.post<any>(this.buildUrl(ApiRoutes.AUTH, 'refreshToken'), {
      refreshToken: this.getFromLocalStorage(STORAGE_REFRESH_TOKEN_KEY),
    });
  }

  getRefreshToken(): string | null {
    return this.getFromLocalStorage(STORAGE_REFRESH_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return this.getFromLocalStorage(STORAGE_ACCESS_TOKEN_KEY);
  }

  setTokens(access_token: string, refresh_token: string) {
    this.setToLocalStorage(STORAGE_ACCESS_TOKEN_KEY, access_token);
    this.setToLocalStorage(STORAGE_REFRESH_TOKEN_KEY, refresh_token);
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
    this.setToLocalStorage(STORAGE_USER_KEY, JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) {
      return this.loggedInUser;
    }
    const userJSON = this.getFromLocalStorage(STORAGE_USER_KEY);
    const parsedUser = JSON.parse(userJSON ?? '{}');
    return new User(parsedUser);
  }

  getTenantId() {
    if (this.superAdminService.isSuperAdmin()) {
      return this.superAdminService.getSelectedTenantIdStream().value;
    } else {
      return this.getLoggedInUser()?.tenantId;
    }
  }

  private buildUrl(...parts: string[]): string {
    return [this.baseUrl, ...parts].join('/');
  }

  private setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
