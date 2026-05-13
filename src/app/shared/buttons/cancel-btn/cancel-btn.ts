import { Component, output, OutputEmitterRef } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-cancel-btn',
  imports: [Button, TranslocoPipe],
  templateUrl: './cancel-btn.html',
  styleUrl: './cancel-btn.scss',
})
export class CancelBtn {
  readonly cancelEvent: OutputEmitterRef<void> = output<void>();

  cancel(): void {
    this.cancelEvent.emit();
  }
}
