import {
  Component,
  input,
  type InputSignal,
  output,
  type OutputEmitterRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-save-btn',
  imports: [MatButton, TranslocoPipe],
  templateUrl: './save-btn.component.html',
  styleUrl: './save-btn.component.scss',
})
export class SaveBtnComponent {
  readonly disabled: InputSignal<boolean> = input(false);
  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  save(): void {
    this.clickEvent.emit();
  }
}
