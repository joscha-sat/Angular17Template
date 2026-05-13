import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-delete-icon',
  imports: [Button],
  templateUrl: './delete-icon.html',
  styleUrl: './delete-icon.scss',
})
export class DeleteIcon {
  readonly color: InputSignal<string> = input('red');

  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
