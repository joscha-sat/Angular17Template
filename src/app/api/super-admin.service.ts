import { Injectable } from "@angular/core";

import { BehaviorSubject, map, Observable } from "rxjs";


import { ApiRoutes } from "../enums/api-routes";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environment/environment";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { ResponseWithRecordsBody } from "../types/ResponseWithRecordsBody.type";


@Injectable({
  providedIn: "root",
})
export class SuperAdminService {
  private selectedTenantId$ = new BehaviorSubject<string | null>(null);
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Returns true if the logged-in user, that is saved in the localStorage is a super admin
   */
  isSuperAdmin(): boolean {
    const userJSON = localStorage.getItem("user");
    const parsedUser = JSON.parse(userJSON || "{}");
    const user = new User(parsedUser);

    if (!user.role) return false;
    return user.role?.superAdmin;
  }

  // Important: you have to end subscription for .getSelectedTenantId() manually on destroy, otherwise => memory leak
  getSelectedTenantId(): BehaviorSubject<string | null> {
    return this.selectedTenantId$;
  }

  setSelectedTenantId(tenantId: string) {
    this.selectedTenantId$.next(tenantId);
  }

  getGlobalUsers(globalRoles: Role[]): Observable<User[]> {
    return this.http
      .get<ResponseWithRecordsBody>(this.baseUrl + ApiRoutes.USER)
      .pipe(
        map((response) => {
          const users: User[] = response.records.map((user: User) =>
            new User(user),
          );
          return users.filter((user) => {
            return globalRoles.some((role) => {
              return role.id === user.roleId;
            });
          });
        }),
      );
  }
}
