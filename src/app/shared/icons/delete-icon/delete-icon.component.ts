import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-delete-icon',
  imports: [MatIcon, TranslocoPipe],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.scss',
})
export class DeleteIconComponent {
  readonly color: InputSignal<string> = input('var(--mat-sys-error)');

  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
