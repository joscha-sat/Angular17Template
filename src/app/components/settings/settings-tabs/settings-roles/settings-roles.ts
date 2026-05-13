import { Component } from '@angular/core';
import { RolesTableComponent } from './roles-table/roles-table';

@Component({
  selector: 'app-settings-roles',
  imports: [RolesTableComponent],
  templateUrl: './settings-roles.html',
  styleUrl: './settings-roles.scss',
})
export class SettingsRolesComponent {}
