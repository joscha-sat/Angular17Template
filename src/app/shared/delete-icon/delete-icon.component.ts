import { Component } from '@angular/core';
import { TuiSvgModule } from "@taiga-ui/core";

@Component({
  selector: 'app-delete-icon',
  standalone: true,
  imports: [
    TuiSvgModule
  ],
  templateUrl: './delete-icon.component.html',
  styleUrl: './delete-icon.component.scss'
})
export class DeleteIconComponent {

}
