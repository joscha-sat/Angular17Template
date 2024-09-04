import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../other/environment/environment';
import { User } from '../other/models/User';
import { SuperAdminService } from './super-admin.service';
import { ApiRoutes } from '../other/enums/api-routes';
import { NavRoutes } from '../other/enums/nav-routes';

const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

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
      this.getFromLocalStorage(StorageKeys.ACCESS_TOKEN) !== null &&
      this.getFromLocalStorage(StorageKeys.REFRESH_TOKEN) !== null
    );
  }

  login(loginBody: LoginBody): Observable<boolean> {
    const url = `${this.baseUrl}/${NavRoutes.AUTH}/${NavRoutes.LOGIN}`;
    return this.http.post<any>(url, loginBody, { observe: 'response' }).pipe(
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
      catchError(() => of(false)),
    );
  }

  sendResetPasswordMail(email: string): Observable<boolean> {
    const url = this.buildUrl(ApiRoutes.AUTH, 'resetPassword');
    return this.http.post<any>(url, { email }, { observe: 'response' }).pipe(
      map((response) => response.status === HttpStatusCode.Created),
      catchError(() => of(false)),
    );
  }

  validateResetPasswordHash(hash: string): Observable<boolean> {
    const url = this.buildUrl(ApiRoutes.AUTH, 'validate', hash);
    return this.http
      .get<any>(url, { observe: 'response' })
      .pipe(map((response) => response.status === HttpStatusCode.Ok));
  }

  setPassword(passwordBody: string, hash: string): Observable<boolean> {
    const url = this.buildUrl(ApiRoutes.AUTH, 'setPassword', hash);
    return this.http.post<any>(url, passwordBody, { observe: 'response' }).pipe(
      map((response) => response.status === HttpStatusCode.Created),
      catchError(() => of(false)),
    );
  }

  resendInviteMail(userId: string) {
    const url = this.buildUrl('auth', 'resendInviteMail');
    return this.http.post(url, { userId });
  }

  logout() {
    this.loggedInUser = null;
    this.clearUserSession();
    this.router.navigateByUrl(NavRoutes.LOGIN).then();
  }

  sendRefreshToken(): Observable<any> {
    const url = this.buildUrl(ApiRoutes.AUTH, 'refreshToken');
    return this.http.post<any>(url, {
      refreshToken: this.getFromLocalStorage(StorageKeys.REFRESH_TOKEN),
    });
  }

  getRefreshToken(): string | null {
    return this.getFromLocalStorage(StorageKeys.REFRESH_TOKEN);
  }

  getAccessToken(): string | null {
    return this.getFromLocalStorage(StorageKeys.ACCESS_TOKEN);
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.setToLocalStorage(StorageKeys.ACCESS_TOKEN, accessToken);
    this.setToLocalStorage(StorageKeys.REFRESH_TOKEN, refreshToken);
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
    this.setToLocalStorage(StorageKeys.USER, JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) return this.loggedInUser;

    const userJSON = this.getFromLocalStorage(StorageKeys.USER);
    return userJSON ? new User(JSON.parse(userJSON)) : null;
  }

  getTenantId() {
    return this.superAdminService.isSuperAdmin()
      ? this.superAdminService.getSelectedTenantIdStream().value
      : this.getLoggedInUser()?.tenantId;
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

  private clearUserSession() {
    Object.values(StorageKeys).forEach((key) =>
      this.removeFromLocalStorage(key),
    );
  }

  private removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
