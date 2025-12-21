import { Component, input, InputSignal } from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

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
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TemplateInputComponent {
  readonly label: InputSignal<string> = input('label');
  readonly fControlName: InputSignal<string> = input.required<string>();
  readonly appearance: InputSignal<'fill' | 'outline'> = input<
    'fill' | 'outline'
  >('outline');
  readonly type: InputSignal<'text' | 'password'> = input<'text' | 'password'>(
    'text',
  );
  readonly subscriptSizing: InputSignal<'dynamic' | 'fixed'> = input<
    'dynamic' | 'fixed'
  >('dynamic');
}
