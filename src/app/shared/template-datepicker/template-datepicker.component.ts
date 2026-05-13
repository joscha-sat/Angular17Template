import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  WritableSignal,
} from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-template-datepicker',
  imports: [DatePicker, ReactiveFormsModule, TranslocoPipe],
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
