import { Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";
import { HeaderLayoutComponent } from "../../../layouts/header-layout/header-layout.component";
import { EditIconComponent } from "../../../shared/edit-icon/edit-icon.component";
import { TuiDialogHelperService } from "../../../services/tui-dialog-helper.service";
import { UserAddEditDialogComponent } from "../user-add-edit-dialog/user-add-edit-dialog.component";

@Component({
  selector: "app-user-header",
  standalone: true,
  imports: [
    TranslateModule,
    BaseTuiButtonComponent,
    HeaderLayoutComponent,
    EditIconComponent,
  ],
  templateUrl: "./user-header.component.html",
  styleUrl: "./user-header.component.scss",
})
export class UserHeaderComponent {
  dialogService = inject(TuiDialogHelperService)

  openCreateUserDialog() {
    this.dialogService.openDialog(UserAddEditDialogComponent)
  }
}
