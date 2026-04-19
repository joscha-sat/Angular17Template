import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-template-spinner',
  imports: [ProgressSpinnerModule],
  templateUrl: './template-spinner.component.html',
  styleUrl: './template-spinner.component.scss',
})
export class TemplateSpinnerComponent {}
