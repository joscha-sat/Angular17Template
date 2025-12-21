import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RoleService } from '../../../../../api/role.service';
import { Role } from '../../../../../models/Role';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-role-dropdown',
  imports: [],
  templateUrl: './role-dropdown.component.html',
  styleUrl: './role-dropdown.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class RoleDropdownComponent implements OnInit {
  readonly roles: WritableSignal<Role[]> = signal<Role[]>([]);
  private readonly roleService: RoleService = inject(RoleService);

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(): void {
    this.roleService
      .getAllRoles()
      .subscribe(
        (
          roles: import('../../../../../api/base-http-service/base-http.service').ResponseWithRecords<Role>,
        ) => {
          this.roles.set(roles.records);
        },
      );
  }
}
