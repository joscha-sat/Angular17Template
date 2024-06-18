import { Component, EventEmitter, input, Output } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { NgIf } from '@angular/common';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDialogHelperService } from '../../services/tui-dialog-helper.service';

@Component({
  selector: 'app-base-save-cancel-btns',
  standalone: true,
  imports: [TuiButtonModule, NgIf, TranslateModule],
  templateUrl: './base-save-cancel-btns.component.html',
  styleUrl: './base-save-cancel-btns.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseSaveCancelBtnsComponent {
  form = input.required<FormGroup>();
  customValidatorBoolean = input<boolean>(false);
  showDeleteBtn = input<boolean>(false);
  dialogContext = input<any>();

  @Output() submitEvent = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(private dialogService: TuiDialogHelperService) {}

  onCancel() {
    if (this.cancel.observers.length === 0) {
      // No subscribers, execute default cancel behavior
      this.defaultCancelBehavior();
    } else {
      // Emit cancel event for parent to handle
      this.cancel.emit();
    }
  }

  defaultCancelBehavior() {
    if (this.dialogContext()) {
      this.dialogService.close(this.dialogContext());
    }
  }

  onSubmit($event: MouseEvent) {
    if (this.customValidatorBoolean()) return;
    this.submitEvent.emit($event);
  }
}
