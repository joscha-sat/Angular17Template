import { Injectable } from "@angular/core";

import { BehaviorSubject, map, Observable } from "rxjs";


import { ApiRoutes } from "../other/enums/api-routes";
import { HttpClient } from "@angular/common/http";
import { environment } from "../other/environment/environment";
import { User } from "../other/models/User";
import { Role } from "../other/models/Role";
import { ResponseWithRecords } from "./generic-http.service";


@Injectable({
  providedIn: "root",
})
export class SuperAdminService {
  private selectedTenantId$ = new BehaviorSubject<string | null>(null);
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  isSuperAdmin(): boolean {
    const userJSON = localStorage.getItem("user");
    const user = userJSON ? new User(JSON.parse(userJSON)) : null;
    if (!user?.role) {
      return false;
    }
    return user.role.superAdmin;
  }

  getSelectedTenantIdStream(): BehaviorSubject<string | null> {
    return this.selectedTenantId$;
  }

  setSelectedTenantId(tenantId: string) {
    this.selectedTenantId$.next(tenantId);
  }

  getGlobalUsers(globalRoles: Role[]): Observable<User[]> {
    return this.fetchUsers().pipe(
      map((response) => this.filterGlobalUsers(response.records, globalRoles))
    );
  }

  private fetchUsers(): Observable<ResponseWithRecords<User>> {
    return this.http.get<ResponseWithRecords<User>>(this.baseUrl + ApiRoutes.USER);
  }

  private filterGlobalUsers(users: User[], globalRoles: Role[]): User[] {
    return users.filter((user) => globalRoles.some((role) => role.id === user.roleId));
  }
}
