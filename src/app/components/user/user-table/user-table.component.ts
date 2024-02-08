import { Component, Input } from "@angular/core";
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
  tableHeaders: string[] = ["Name"];
  tableColumns: string[] = ["firstName"];
}
