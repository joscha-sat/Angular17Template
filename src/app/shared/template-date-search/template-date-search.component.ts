import { Component, input, InputSignal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateDatepickerComponent } from '../template-datepicker/template-datepicker.component';

@Component({
  selector: 'app-template-date-search',
  imports: [TemplateDatepickerComponent, ReactiveFormsModule],
  templateUrl: './template-date-search.component.html',
  styleUrl: './template-date-search.component.scss',
})
export class TemplateDateSearchComponent {
  service: InputSignal<{ searchDate: WritableSignal<string> }> =
    input.required<{ searchDate: WritableSignal<string> }>();

  dateChange($event: string): void {
    if (!$event) {
      this.service().searchDate.set('');
      return;
    }

    this.service().searchDate.set($event);
  }
}
