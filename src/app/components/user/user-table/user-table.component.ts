import { Component, inject, Input, signal } from "@angular/core";
import { Observable } from "rxjs";
import {
  BaseTableAsyncComponent,
  FetchDataFunction
} from "../../../shared/base-table-async/base-table-async.component";
import { AsyncPipe } from "@angular/common";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";
import { User } from "../../../other/models/User";
import { TuiDialogHelperService } from "../../../services/tui-dialog-helper.service";
import { UserAddEditDialogComponent } from "../user-add-edit-dialog/user-add-edit-dialog.component";

@Component({
  selector: "app-user-table",
  standalone: true,
  imports: [
    BaseTableAsyncComponent,
    AsyncPipe,
    BaseTableComponent,
  ],
  templateUrl: "./user-table.component.html",
  styleUrl: "./user-table.component.scss",
})
export class UserTableComponent {
  @Input({ required: true }) user$: Observable<any> | undefined;
  @Input({ required: true }) fetchData!: FetchDataFunction<User>;
  dialogService = inject(TuiDialogHelperService<User>)

  // todo: update active visually
  tableHeaders = signal<string[]>(["Vorname", "Nachname", "Telefon", "Email", "Aktiv"]);
  tableColumns = signal<string[]>(["firstName", "lastName", "phone", "email", "active"]);


  userClicked($event: User) {
    const user = new User($event)
    this.dialogService.openDialog(UserAddEditDialogComponent, user)
  }
}

