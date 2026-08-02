import { Component, inject, signal, type WritableSignal } from '@angular/core';
import type { Role } from '../../../../../models/Role';
import type { Table } from '../../../../../other/types/Table.type';
import { RoleService } from '../../../../../api/role.service';

@Component({
  selector: 'app-roles-table',
  imports: [],
  templateUrl: './roles-table.component.html',
  styleUrl: './roles-table.component.scss',
})
export class RolesTableComponent implements Table<Role> {
  roleService: RoleService = inject(RoleService);

  // enter i18n keys here
  readonly headers: WritableSignal<string[]> = signal<string[]>([
    'general.name',
    'general.description',
    'general.edit',
    'general.delete',
  ]);
  readonly columns: WritableSignal<(keyof Role | 'delete' | 'edit')[]> = signal<
    (keyof Role | 'delete' | 'edit')[]
  >(['name', 'description', 'edit', 'delete']);

  setTableRefreshMethodName(): string {
    return 'getAllRoles';
  }

  setTableRefreshService(): RoleService {
    return this.roleService;
  }
}
