import { Component, output, type OutputEmitterRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-cancel-btn',
  imports: [MatButton, TranslocoPipe],
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.scss',
})
export class CancelButtonComponent {
  readonly cancelEvent: OutputEmitterRef<void> = output<void>();

  cancel(): void {
    this.cancelEvent.emit();
  }
}
