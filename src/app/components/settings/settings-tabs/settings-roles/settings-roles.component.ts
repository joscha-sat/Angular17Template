import { Component } from '@angular/core';
import { RolesTableComponent } from './roles-table/roles-table.component';

@Component({
  selector: 'app-settings-roles',
  imports: [RolesTableComponent],
  templateUrl: './settings-roles.component.html',
  styleUrl: './settings-roles.component.scss',
})
export class SettingsRolesComponent {}
