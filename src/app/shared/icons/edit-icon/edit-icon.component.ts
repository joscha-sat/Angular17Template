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
  selector: 'app-edit-icon',
  imports: [MatIcon, TranslocoPipe],
  templateUrl: './edit-icon.component.html',
  styleUrl: './edit-icon.component.scss',
})
export class EditIconComponent {
  readonly color: InputSignal<string | undefined> = input();
  readonly clickEvent: OutputEmitterRef<void> = output<void>();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
