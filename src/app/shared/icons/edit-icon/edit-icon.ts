import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-edit-icon',
  imports: [Button],
  templateUrl: './edit-icon.html',
  styleUrl: './edit-icon.scss',
})
export class EditIcon {
  readonly color: InputSignal<string | undefined> = input();
  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
