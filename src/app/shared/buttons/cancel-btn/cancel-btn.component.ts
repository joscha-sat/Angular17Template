import { Component, output, OutputEmitterRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-cancel-btn',
  imports: [MatButton, TranslocoPipe],
  templateUrl: './cancel-btn.component.html',
  styleUrl: './cancel-btn.component.scss',
})
export class CancelBtnComponent {
  readonly cancelEvent: OutputEmitterRef<void> = output<void>();

  cancel(): void {
    this.cancelEvent.emit();
  }
}
