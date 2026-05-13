import { Component, input, InputSignal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateDatepicker } from '../template-datepicker/template-datepicker';

@Component({
  selector: 'app-template-date-search',
  imports: [TemplateDatepicker, ReactiveFormsModule],
  templateUrl: './template-date-search.html',
  styleUrl: './template-date-search.scss',
})
export class TemplateDateSearch {
  readonly service: InputSignal<{ searchDate: WritableSignal<string> }> = input.required<{
    searchDate: WritableSignal<string>;
  }>();

  dateChange($event: string): void {
    if (!$event) {
      this.service().searchDate.set('');
      return;
    }

    this.service().searchDate.set($event);
  }
}
