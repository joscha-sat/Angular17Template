import { Component } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAppearanceModule } from '@taiga-ui/experimental';

@Component({
  selector: 'app-delete-icon',
  standalone: true,
  imports: [TuiSvgModule, TuiButtonModule, TuiAppearanceModule],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.scss',
})
export class DeleteIconComponent {}
