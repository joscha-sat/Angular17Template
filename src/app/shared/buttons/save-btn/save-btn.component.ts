import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-save-btn',
  imports: [ButtonModule, TranslocoPipe],
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
