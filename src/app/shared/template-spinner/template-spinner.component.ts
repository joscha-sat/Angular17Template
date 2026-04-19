import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-template-spinner',
  imports: [ProgressSpinner],
  templateUrl: './template-spinner.component.html',
  styleUrl: './template-spinner.component.scss',
})
export class TemplateSpinnerComponent {}
