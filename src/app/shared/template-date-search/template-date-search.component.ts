import { Component, input, type InputSignal, type WritableSignal } from '@angular/core';
import { TemplateDatepickerComponent } from '../template-datepicker/template-datepicker.component';

@Component({
  selector: 'app-template-date-search',
  imports: [TemplateDatepickerComponent],
  templateUrl: './template-date-search.component.html',
  styleUrl: './template-date-search.component.scss',
})
export class TemplateDateSearchComponent {
  readonly service: InputSignal<{ searchDate: WritableSignal<string> }> = input.required<{
    searchDate: WritableSignal<string>;
  }>();
}
