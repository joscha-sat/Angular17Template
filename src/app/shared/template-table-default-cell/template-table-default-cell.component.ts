import { DatePipe } from '@angular/common';
import { Component, input, type InputSignal } from '@angular/core';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';

export type TemplateTableCellValue = string | number | Date | null | undefined;

@Component({
  selector: 'app-template-table-default-cell',
  imports: [DatePipe, IsDatePipe],
  standalone: true,
  templateUrl: './template-table-default-cell.component.html',
})
export class TemplateTableDefaultCellComponent {
  readonly value: InputSignal<TemplateTableCellValue> = input.required<TemplateTableCellValue>();
}
