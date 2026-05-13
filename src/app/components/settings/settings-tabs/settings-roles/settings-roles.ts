import { Component } from '@angular/core';
import { RolesTable } from './roles-table/roles-table';

@Component({
  selector: 'app-settings-roles',
  imports: [RolesTable],
  templateUrl: './settings-roles.html',
  styleUrl: './settings-roles.scss',
})
export class SettingsRoles {}
