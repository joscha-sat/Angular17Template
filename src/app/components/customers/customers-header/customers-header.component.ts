import { Component } from '@angular/core';
import { HeaderLayoutComponent } from "../../../other/layouts/header-layout/header-layout.component";
import { TranslateModule } from "@ngx-translate/core";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";

@Component({
  selector: 'app-customers-header',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    TranslateModule,
    BaseTuiButtonComponent
  ],
  templateUrl: './customers-header.component.html',
  styleUrl: './customers-header.component.scss'
})
export class CustomersHeaderComponent {

}
