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
}
