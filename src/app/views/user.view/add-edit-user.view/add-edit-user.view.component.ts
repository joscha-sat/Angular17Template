import { Component } from '@angular/core';
import { BaseDialogComponent } from "../../../shared/base-dialog/base-dialog.component";

@Component({
  selector: 'app-add-edit-user.view',
  standalone: true,
  imports: [
    BaseDialogComponent
  ],
  templateUrl: './add-edit-user.view.component.html',
  styleUrl: './add-edit-user.view.component.scss'
})
export class AddEditUserViewComponent {

}
