import {
  TuiInputDateModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
} from '@taiga-ui/legacy';
import { TuiValueChanges } from '@taiga-ui/cdk';
import { Component, inject, input, WritableSignal } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiError, TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { DateConverterService } from '../../services/date-converter.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base-date-picker',
  imports: [
    TuiInputDateModule,
    TuiError,
    ReactiveFormsModule,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiTextfieldControllerModule,
    TuiValueChanges,
    TranslateModule,
    TuiUnfinishedValidator,
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
  dateConverter = inject(DateConverterService);

  hint = input<string>('general.select-date');
  fControlName = input.required<string>();
  service = input<{ searchDate: WritableSignal<string> }>();
  readOnly = input<boolean>(false);
  size = input<TuiSizeL | TuiSizeS>('m');

  dateChangeEvent(tuiDay: any) {
    if (!tuiDay) {
      this.service()?.searchDate.set('');
      return;
    }

    // searches in the backend via searchDate param
    const isoDate = this.dateConverter.formatTaigaDateToIsoDate([tuiDay]);
    this.service()?.searchDate.set(isoDate);
  }
}
