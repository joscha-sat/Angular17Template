import { Component, input, output, WritableSignal } from '@angular/core';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    TranslatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './template-datepicker.component.html',
  styleUrl: './template-datepicker.component.scss',
})
export class TemplateDatepickerComponent {
  minDate = input<Date>();
  maxDate = input<Date>();
  label = input('general.select-date');

  fControlName = input<string>('date');
  service = input<{ searchDate: WritableSignal<string> }>();

  dateChange = output<string>();

  selectedDateChanged(isoString: string) {
    this.dateChange.emit(isoString);
  }
}
