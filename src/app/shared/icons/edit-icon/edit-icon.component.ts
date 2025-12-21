import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edit-icon',
  imports: [MatIcon],
  templateUrl: './edit-icon.component.html',
  styleUrl: './edit-icon.component.scss',
})
export class EditIconComponent {
  color: InputSignal<string | undefined> = input();
  clickEvent: OutputEmitterRef<void> = output<void>();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
