import { Component } from "@angular/core";
import { BaseTableComponent } from "../../shared/base-table/base-table.component";
import { TuiIslandModule } from "@taiga-ui/kit";
import { ViewLayoutComponent } from "../../layouts/view-layout/view-layout.component";
import { SettingsHeaderComponent } from "../../components/settings/settings-header/settings-header.component";

@Component({
  selector: "app-settings.view",
  standalone: true,
  imports: [
    BaseTableComponent,
    TuiIslandModule,
    ViewLayoutComponent,
    SettingsHeaderComponent,
  ],
  templateUrl: "./settings.view.component.html",
  styleUrl: "./settings.view.component.scss",
})
export class SettingsViewComponent {
  // The arrays are filled with some sample data
  tableData: any[] = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'Chicago' },
    { name: 'Mike', age: 35, city: 'Los Angeles' }
  ];
  headers: string[] = ['Alter'];
  columns: string[] = ['age'];
  customHeaders: string[] = ['Name', 'Stadt']
  customColumns: string[] = ['name', 'city']
}
