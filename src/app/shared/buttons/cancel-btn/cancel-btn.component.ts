import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cancel-btn',
  imports: [MatButton, TranslatePipe],
  templateUrl: './cancel-btn.component.html',
  styleUrl: './cancel-btn.component.scss',
})
export class CancelBtnComponent {
  cancelEvent = output();

  cancel() {
    this.cancelEvent.emit();
  }
}
