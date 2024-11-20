import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { Component, inject, input, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseDatePickerComponent } from '../base-date-picker/base-date-picker.component';

@Component({
  selector: 'app-base-search-date',
  imports: [
    ReactiveFormsModule,
    BaseDatePickerComponent,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './base-search-date.component.html',
  styleUrl: './base-search-date.component.scss',
})
export class BaseSearchDateComponent {
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    date: null,
  });

  service = input.required<{ searchDate: WritableSignal<string> }>();
}
