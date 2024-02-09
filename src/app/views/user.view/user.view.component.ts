import { Component, inject, OnInit, signal } from "@angular/core";
import { UserHeaderComponent } from "../../components/user/user-header/user-header.component";
import { UserTableComponent } from "../../components/user/user-table/user-table.component";
import { User } from "../../models/User";
import { UserService } from "../../api/user.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { SuperAdminService } from "../../api/super-admin.service";
import { TenantService } from "../../api/tenant.service";
import { AuthService } from "../../api/auth.service";
import { ViewLayoutComponent } from "../../layouts/view-layout/view-layout.component";

@Component({
  selector: "app-user.view",
  standalone: true,
  imports: [
    UserHeaderComponent,
    UserTableComponent,
    ViewLayoutComponent,
  ],
  templateUrl: "./user.view.component.html",
  styleUrl: "./user.view.component.scss",
})
export class UserViewComponent implements OnInit {
  // | services | --------------------------------------------------------------------------  ||
  userService = inject(UserService);
  authService = inject(AuthService);
  tenantService = inject(TenantService);
  superAdminService = inject(SuperAdminService);
  // | signals / vars / getters | ----------------------------------------------------------  ||
  users = signal<User[]>([]);
  users$ = toObservable<User[]>(this.users);

  get tenantId(): string {
    // case super admin
    if (this.superAdminService.isSuperAdmin()) {
      return this.tenantService.selectedTenantId()
    }
    // case logged in tenant
    else {
      return this.authService.getLoggedInUser()?.tenantId || ''
    }
  }

  // | init | ------------------------------------------------------------------------------  ||
  ngOnInit(): void {
    this.getUsers();
  }

  // | normal methods | --------------------------------------------------------------------  ||
  getUsers() {
    this.userService.getUsers({ tenantId: this.tenantId }).subscribe((user: User[]) => {
      this.users.set(user);
    });
  }
}
