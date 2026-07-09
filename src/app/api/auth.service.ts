import { inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../other/environments/environment';
import { User } from '../models/User';
import { ApiRoutes } from '../other/enums/api_routes';
import { ROUTES } from '../other/enums/ROUTES';

const StorageKeys: {
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  USER: string;
} = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type RefreshTokenResponse = {
  status: number;
  data: {
    access: string;
    refresh: string;
    user: User;
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);

  private readonly baseUrl: string = environment.baseUrl;
  private loggedInUser?: User;

  isLoggedIn(): boolean {
    // TODO: Require authentication again when the application is ready for non-developer users.
    if (isDevMode()) {
      return true;
    }

    return (
      this.getFromLocalStorage(StorageKeys.ACCESS_TOKEN) !== null &&
      this.getFromLocalStorage(StorageKeys.REFRESH_TOKEN) !== null
    );
  }

  login(loginBody: LoginBody): Observable<void> {
    const url: string = `${this.baseUrl}${ROUTES.AUTH}/${ROUTES.LOGIN}`;
    return this.http.post<LoginResponse>(url, loginBody).pipe(
      map((response: LoginResponse) => {
        this.setTokens(response.access_token, response.refresh_token);
        this.setLoggedInUser(response.user);
      }),
    );
  }

  logout(): Promise<boolean> {
    this.loggedInUser = undefined;
    this.clearUserSession();
    return this.router.navigateByUrl(ROUTES.LOGIN);
  }

  sendRefreshToken(): Observable<RefreshTokenResponse> {
    const url: string = this.buildUrl(ApiRoutes.AUTH, 'refreshToken');
    return this.http.post<RefreshTokenResponse>(url, {
      refreshToken: this.getFromLocalStorage(StorageKeys.REFRESH_TOKEN),
    });
  }

  getRefreshToken(): string | null {
    return this.getFromLocalStorage(StorageKeys.REFRESH_TOKEN);
  }

  getAccessToken(): string | null {
    return this.getFromLocalStorage(StorageKeys.ACCESS_TOKEN);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.setToLocalStorage(StorageKeys.ACCESS_TOKEN, accessToken);
    this.setToLocalStorage(StorageKeys.REFRESH_TOKEN, refreshToken);
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    this.setToLocalStorage(StorageKeys.USER, JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) {
      return this.loggedInUser;
    }

    const userJSON: string | null = this.getFromLocalStorage(StorageKeys.USER);
    return userJSON ? new User(JSON.parse(userJSON)) : null;
  }

  private buildUrl(...parts: string[]): string {
    return [this.baseUrl, ...parts].join('/');
  }

  private setToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private clearUserSession(): void {
    Object.values(StorageKeys).forEach((key: string) => this.removeFromLocalStorage(key));
  }

  private removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}

// todo: might need cleanup
// sendResetPasswordMail(email: string): Observable<boolean> {
//   const url = this.buildUrl(ApiRoutes.AUTH, 'resetPassword');
//   return this.http.post<any>(url, { email }, { observe: 'response' }).pipe(
//     map((response) => response.status === HttpStatusCode.Created),
//     catchError(() => of(false)),
//   );
// }
//
// validateResetPasswordHash(hash: string): Observable<boolean> {
//   const url = this.buildUrl(ApiRoutes.AUTH, 'validate', hash);
//   return this.http
//     .get<any>(url, { observe: 'response' })
//     .pipe(map((response) => response.status === HttpStatusCode.Ok));
// }
//
// setPassword(passwordBody: string, hash: string): Observable<boolean> {
//   const url = this.buildUrl(ApiRoutes.AUTH, 'setPassword', hash);
//   return this.http.post<any>(url, passwordBody, { observe: 'response' }).pipe(
//     map((response) => response.status === HttpStatusCode.Created),
//     catchError(() => of(false)),
//   );
// }
//
// resendInviteMail(userId: string) {
//   const url = this.buildUrl('auth', 'resendInviteMail');
//   return this.http.post(url, { userId });
// }
