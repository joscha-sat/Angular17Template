import { Component, input, InputSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-template-input',
  imports: [InputTextModule, ReactiveFormsModule, TranslocoPipe],
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
  readonly type: InputSignal<'text' | 'password'> = input<'text' | 'password'>(
    'text',
  );
}
