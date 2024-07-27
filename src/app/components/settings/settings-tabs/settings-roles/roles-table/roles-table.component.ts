import { Component, inject, signal } from '@angular/core';
import { BaseTableComponent } from '../../../../../shared/base-table/base-table.component';
import { TableRefresherComponent } from '../../../../../other/abstract-class-components/table-refresher.component';
import { Role } from '../../../../../other/models/Role';
import { Table } from '../../../../../other/types/Table.type';
import { RoleService } from '../../../../../api/role.service';

@Component({
  selector: 'app-roles-table',
  standalone: true,
  imports: [BaseTableComponent],
  templateUrl: './roles-table.component.html',
  styleUrl: './roles-table.component.scss',
})
export class RolesTableComponent
  extends TableRefresherComponent<Role>
  implements Table<Role>
{
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

  override ngOnInit() {
    super.ngOnInit();
    // it translates the header keys in the parent component. Nothing else needed
    super.translateHeaders(this.headers);
  }

  setTableRefreshMethodName(): string {
    return 'getAllRoles';
  }

  setTableRefreshService() {
    return this.roleService;
  }
}
