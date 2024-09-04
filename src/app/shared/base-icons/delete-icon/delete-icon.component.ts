import { Component } from '@angular/core';
import { TuiAppearance, TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-delete-icon',
  standalone: true,
  imports: [TuiIcon, TuiButton, TuiAppearance],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.scss',
})
export class DeleteIconComponent {}
