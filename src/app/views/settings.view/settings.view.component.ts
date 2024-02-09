import { Component } from "@angular/core";
import { BaseTableComponent } from "../../shared/base-table/base-table.component";
import { TuiIslandModule } from "@taiga-ui/kit";
import { ViewLayoutComponent } from "../../layouts/view-layout/view-layout.component";

@Component({
  selector: "app-settings.view",
  standalone: true,
  imports: [
    BaseTableComponent,
    TuiIslandModule,
    ViewLayoutComponent,
  ],
  templateUrl: "./settings.view.component.html",
  styleUrl: "./settings.view.component.scss",
})
export class SettingsViewComponent {
  tableHeaders: string[] = ["ID", "Name", "Group"];
  tableColumns: string[] = ["id", "name", "group"];
  tableData: any[] = [
    { id: 1, name: "John Doe", group: "A" },
    { id: 2, name: "Jane Smith", group: "B" },
    { id: 3, name: "Bob Johnson", group: "A" },
    { id: 4, name: "Alice Williams", group: "C" },
    { id: 5, name: "Charlie Brown", group: "B" },
    { id: 6, name: "Daniel Rodriguez", group: "A" },
    { id: 7, name: "Emily Martinez", group: "C" },
    { id: 8, name: "Frank Thompson", group: "B" },
    { id: 9, name: "Grace Anderson", group: "C" },
    { id: 10, name: "Harry Jackson", group: "A" },
    { id: 11, name: "Irene Thomas", group: "B" },
    { id: 12, name: "Jack Wilson", group: "A" },
    { id: 13, name: "Katie Moore", group: "C" },
    { id: 14, name: "Larry Taylor", group: "B" },
    { id: 15, name: "Mia Scott", group: "A" },
  ];
}
