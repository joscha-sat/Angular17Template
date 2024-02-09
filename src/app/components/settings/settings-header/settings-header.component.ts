import { Component } from '@angular/core';
import { HeaderLayoutComponent } from "../../../layouts/header-layout/header-layout.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-settings-header',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    TranslateModule
  ],
  templateUrl: './settings-header.component.html',
  styleUrl: './settings-header.component.scss'
})
export class SettingsHeaderComponent {

}
