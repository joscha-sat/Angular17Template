import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-icon',
  imports: [ButtonModule],
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
