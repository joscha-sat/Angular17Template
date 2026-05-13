import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-template-spinner',
  imports: [ProgressSpinner],
  templateUrl: './template-spinner.html',
  styleUrl: './template-spinner.scss',
})
export class TemplateSpinner {}
