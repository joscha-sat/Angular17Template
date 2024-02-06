import { Component } from "@angular/core";
import { BaseTableComponent } from "../../shared/base-table/base-table.component";
import { TuiIslandModule } from "@taiga-ui/kit";

@Component({
  selector: "app-settings.view",
  standalone: true,
  imports: [
    BaseTableComponent,
    TuiIslandModule,
  ],
  templateUrl: "./settings.view.component.html",
  styleUrl: "./settings.view.component.scss",
})
export class SettingsViewComponent {
  columns: string[] = ["name", "age", "address.street"];
  headers: string[] = ["Name", "Age", "address"];
  tableData: any = [
    {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    },
    {
      name: "Jane Doe",
      age: 28,
      address: { street: "kaiserstraße" },
    },
    {
      name: "Emily Clark",
      age: 35,
      address: { street: "müllerweg" },
    },
    {
      name: "Michael Brown",
      age: 40,
      address: { street: "schulzallee" },
    },
    {
      name: "David Johnson",
      age: 33,
      address: { street: "schmidtstraße" },
    },
  ];

}
