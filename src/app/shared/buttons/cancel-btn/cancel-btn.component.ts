import { Component, output, OutputEmitterRef } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-cancel-btn',
  imports: [Button, TranslocoPipe],
  templateUrl: './cancel-btn.component.html',
  styleUrl: './cancel-btn.component.scss',
})
export class CancelBtnComponent {
  readonly cancelEvent: OutputEmitterRef<void> = output<void>();

  cancel(): void {
    this.cancelEvent.emit();
  }
}
