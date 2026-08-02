import { Component, input, type InputSignal, output, type OutputEmitterRef, type WritableSignal } from '@angular/core';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-template-datepicker',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatDatepickerInput,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './template-datepicker.component.html',
  styleUrl: './template-datepicker.component.scss',
})
export class TemplateDatepickerComponent {
  readonly minDate: InputSignal<Date | undefined> = input<Date>();
  readonly maxDate: InputSignal<Date | undefined> = input<Date>();
  readonly label: InputSignal<string> = input('general.select-date');

  readonly fControlName: InputSignal<string> = input<string>('date');
  readonly service: InputSignal<{ searchDate: WritableSignal<string> } | undefined> = input<{
    searchDate: WritableSignal<string>;
  }>();

  readonly dateChange: OutputEmitterRef<string> = output<string>();

  selectedDateChanged(isoString: string): void {
    this.dateChange.emit(isoString);
  }
}
