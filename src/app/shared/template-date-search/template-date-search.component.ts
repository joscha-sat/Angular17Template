import { Component, input, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateDatepickerComponent } from '../template-datepicker/template-datepicker.component';

@Component({
  selector: 'app-template-date-search',
  imports: [TemplateDatepickerComponent, ReactiveFormsModule],
  templateUrl: './template-date-search.component.html',
  styleUrl: './template-date-search.component.scss',
})
export class TemplateDateSearchComponent {
  service = input.required<{ searchDate: WritableSignal<string> }>();

  dateChange($event: string) {
    if (!$event) {
      this.service().searchDate.set('');
      return;
    }

    this.service().searchDate.set($event);
  }
}
