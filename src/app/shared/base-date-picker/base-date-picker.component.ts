import { Component, input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputDateModule } from '@taiga-ui/kit';
import { TuiErrorModule } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-base-date-picker',
  standalone: true,
  imports: [
    TuiInputDateModule,
    TuiErrorModule,
    ReactiveFormsModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
  ],
  templateUrl: './base-date-picker.component.html',
  styleUrl: './base-date-picker.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseDatePickerComponent {
  hint = input<string>('Datum auswählen');
  fControlName = input.required<string>();
}
