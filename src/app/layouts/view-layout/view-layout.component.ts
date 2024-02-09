import { Component } from '@angular/core';
import { UserHeaderComponent } from "../../components/user/user-header/user-header.component";
import { UserTableComponent } from "../../components/user/user-table/user-table.component";

@Component({
  selector: 'app-view-layout',
  standalone: true,
  imports: [
    UserHeaderComponent,
    UserTableComponent
  ],
  templateUrl: './view-layout.component.html',
  styleUrl: './view-layout.component.scss'
})
export class ViewLayoutComponent {

}
