import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-template-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './template-spinner.component.html',
  styleUrl: './template-spinner.component.scss',
})
export class TemplateSpinnerComponent {}
