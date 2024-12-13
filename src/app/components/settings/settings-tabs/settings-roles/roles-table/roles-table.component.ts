import { Component, inject, OnInit, signal } from '@angular/core';
import { Role } from '../../../../../other/models/Role';
import { Table } from '../../../../../other/types/Table.type';
import { RoleService } from '../../../../../api/role.service';

@Component({
  selector: 'app-roles-table',
  imports: [],
  templateUrl: './roles-table.component.html',
  styleUrl: './roles-table.component.scss',
})
export class RolesTableComponent implements Table<Role>, OnInit {
  roleService = inject(RoleService);

  // enter i18n keys here
  headers = signal<string[]>([
    'general.name',
    'general.description',
    'general.edit',
    'general.delete',
  ]);
  columns = signal<(keyof Role | 'delete' | 'edit')[]>([
    'name',
    'description',
    'edit',
    'delete',
  ]);

  ngOnInit() {}

  setTableRefreshMethodName(): string {
    return 'getAllRoles';
  }

  setTableRefreshService() {
    return this.roleService;
  }
}
