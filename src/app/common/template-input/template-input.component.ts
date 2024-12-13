import { Component, input } from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-input',
  imports: [
    MatFormField,
    MatInput,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
  ],
  templateUrl: './template-input.component.html',
  styleUrl: './template-input.component.scss',
})
export class TemplateInputComponent {
  label = input('label');
  fControlName = input.required<string>();
  appearance = input<'fill' | 'outline'>('outline');
  type = input<'text' | 'password'>('text');
}
