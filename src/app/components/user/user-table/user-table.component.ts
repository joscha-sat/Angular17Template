import { Component, inject, OnInit, signal } from '@angular/core';
import { TemplateTableComponent } from '../../../shared/template-table/template-table.component';
import { BaseTableComponent } from '../../../other/abstract-class/BaseTableComponent';
import { UserService } from '../../../api/user.service';
import { Observable, tap } from 'rxjs';
import { ResponseWithRecords } from '../../../api/base-http-service/base-http.service';
import { User } from '../../../other/models/User';
import { DeleteIconComponent } from '../../../shared/icons/delete-icon/delete-icon.component';

const COLUMN_CONFIG = {
  displayedColumns: ['name', 'createdAt', 'updatedAt', 'actions'],
  headers: ['Name', 'Erstellt am', 'Aktualisiert am', ''],
};

@Component({
  selector: 'app-user-table',
  imports: [TemplateTableComponent, DeleteIconComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent extends BaseTableComponent implements OnInit {
  userService = inject(UserService);
  users = signal<User[]>([]);

  displayedColumns = signal(COLUMN_CONFIG.displayedColumns);
  header = signal(COLUMN_CONFIG.headers);
  totalItems = signal(0);

  skip = signal(0);
  limit = signal(10);

  ngOnInit(): void {
    this.setupRefreshSub();
    this.getAllUsers().subscribe();
  }

  deleteUser(id: string) {
    this.userService.deleteUserById(id).subscribe(() => {
      this.utilityService.tableDataRefreshSubject.next();
    });
  }

  protected getLoadDataMethod(): () => Observable<ResponseWithRecords<User>> {
    return () => this.getAllUsers(); // Provide a loader returning Observable
  }

  private getAllUsers(): Observable<ResponseWithRecords<User>> {
    return this.userService.getAllUsers().pipe(
      tap((response) => {
        this.users.set(response.records);
        this.totalItems.set(response.total);
      }),
    );
  }
}
