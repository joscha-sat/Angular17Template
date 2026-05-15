import { Component, inject, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../../api/user.service';

const COLUMN_CONFIG: {
  displayedColumns: string[];
  headers: string[];
} = {
  displayedColumns: ['name', 'createdAt', 'updatedAt', 'actions'],
  headers: ['general.name', 'general.createdAt', 'general.updatedAt', ''],
};

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {
  userService: UserService = inject(UserService);

  readonly columns: WritableSignal<string[]> = signal<string[]>(COLUMN_CONFIG.displayedColumns);
  readonly headers: WritableSignal<string[]> = signal<string[]>(COLUMN_CONFIG.headers);
}
