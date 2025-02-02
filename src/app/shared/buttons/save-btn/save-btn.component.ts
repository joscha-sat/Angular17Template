import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-save-btn',
  imports: [MatButton, TranslatePipe],
  templateUrl: './save-btn.component.html',
  styleUrl: './save-btn.component.scss',
})
export class SaveBtnComponent {
  disabled = input(false);
  clickEvent = output();

  save() {
    this.clickEvent.emit();
  }
}
