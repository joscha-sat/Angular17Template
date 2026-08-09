import { Component, input, type InputSignal, output, type OutputEmitterRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-save-btn',
  imports: [MatButton, TranslocoPipe],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  readonly disabled: InputSignal<boolean> = input(false);
  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  save(): void {
    this.clickEvent.emit();
  }
}
