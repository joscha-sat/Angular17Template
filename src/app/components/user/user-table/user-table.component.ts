import { Component, Input, signal } from "@angular/core";
import { Observable } from "rxjs";
import { BaseTableAsyncComponent } from "../../../shared/base-table-async/base-table-async.component";
import { AsyncPipe } from "@angular/common";
import { BaseTableComponent } from "../../../shared/base-table/base-table.component";

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

  // todo: update active visually
  tableHeaders = signal<string[]>(["Vorname", "Nachname", "Telefon", "Email", "Aktiv"]) ;
  tableColumns = signal<string[]>(["firstName", "lastName", "phone", "email", "active"]) ;
}
