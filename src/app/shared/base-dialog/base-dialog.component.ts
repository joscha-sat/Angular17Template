import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiDialogHelperService } from '../../services/tui-dialog-helper.service';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [],
  templateUrl: './base-dialog.component.html',
  styleUrl: './base-dialog.component.scss',
})
export class BaseDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) readonly context: TuiDialogContext<any, any>,
    protected dialogService: TuiDialogHelperService,
  ) {}

  closeDialog() {
    this.dialogService.close(this.context);
  }
}
