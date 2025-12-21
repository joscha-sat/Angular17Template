import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-icon',
  imports: [MatIcon],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.scss',
})
export class DeleteIconComponent {
  color = input('var(--mat-sys-error)');

  clickEvent = output();

  iconClick(): void {
    this.clickEvent.emit();
  }
}
