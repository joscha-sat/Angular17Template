import { Component, inject } from "@angular/core";
import { UserHeaderComponent } from "../../components/user/user-header/user-header.component";
import { UserTableComponent } from "../../components/user/user-table/user-table.component";
import { User } from "../../other/models/User";
import { UserService } from "../../api/user.service";
import { SuperAdminService } from "../../api/super-admin.service";
import { TenantService } from "../../api/tenant.service";
import { AuthService } from "../../api/auth.service";
import { ViewLayoutComponent } from "../../other/layouts/view-layout/view-layout.component";
import { FetchDataFunction } from "../../shared/base-table-async/base-table-async.component";


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
export class UserViewComponent {
  // | services | --------------------------------------------------------------------------  ||
  userService = inject(UserService);
  authService = inject(AuthService);
  tenantService = inject(TenantService);
  superAdminService = inject(SuperAdminService);

  get tenantId(): string {
    // case super admin
    if (this.superAdminService.isSuperAdmin()) {
      return this.tenantService.selectedTenantId()
    }
    // case logged in tenant
    else {
      return this.authService.getLoggedInUser()?.tenantId ?? ''
    }
  }

  // | normal methods | --------------------------------------------------------------------  ||
  fetchUserFn: FetchDataFunction<User> = (page: number, size: number) => {
    return this.userService.getAllUsers({ tenantId: this.tenantId, limit: size, skip: page * size });
  }
}
