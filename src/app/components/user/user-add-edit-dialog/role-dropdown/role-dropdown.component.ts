import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleService } from '../../../../api/role.service';
import { Role } from '../../../../other/models/Role';
import { BaseComboboxComponent } from '../../../../shared/base-combobox/base-combobox.component';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-role-dropdown',
  imports: [BaseComboboxComponent],
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
  roles = signal<Role[]>([]);
  private roleService = inject(RoleService);

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((roles) => {
      this.roles.set(roles.records);
    });
  }
}
