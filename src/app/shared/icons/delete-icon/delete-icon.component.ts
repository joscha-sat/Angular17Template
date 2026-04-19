import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-delete-icon',
  imports: [Button],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.scss',
})
export class DeleteIconComponent {
  readonly color: InputSignal<string> = input('red');

  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
