import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edit-icon',
  imports: [MatIcon],
  templateUrl: './edit-icon.component.html',
  styleUrl: './edit-icon.component.scss',
})
export class EditIconComponent {
  color = input();
  clickEvent = output();

  iconClick() {
    this.clickEvent.emit();
  }
}
