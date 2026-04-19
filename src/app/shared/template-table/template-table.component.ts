import {
  AfterViewInit,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  TemplateRef,
} from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-template-table',
  imports: [NgTemplateOutlet, DatePipe, IsDatePipe, TableModule],
  standalone: true,
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss',
})
export class TemplateTableComponent<T> implements AfterViewInit {
  readonly headers: InputSignal<string[]> = input.required<string[]>();
  readonly displayedColumns: InputSignal<string[]> = input.required<string[]>();
  readonly cellTemplatesMap: InputSignal<{
    [key: string]: TemplateRef<unknown>;
  }> = input<{
    [key: string]: TemplateRef<unknown>;
  }>({});

  readonly tableData: InputSignal<T[]> = input.required<T[]>();

  readonly pageSizes: InputSignal<number[]> = input<number[]>([5, 10, 25, 100]);
  readonly initialPageSize: InputSignal<number> = input<number>(10);
  readonly totalItems: InputSignal<number | undefined> = input<
    number | undefined
  >();

  readonly paginationChange: OutputEmitterRef<{ first: number; rows: number }> =
    output<{
      first: number;
      rows: number;
    }>();

  first: number = 0;
  rows: number = 10;

  ngAfterViewInit(): void {
    this.rows = this.initialPageSize();
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.first = event.first;
    this.rows = event.rows;
    this.paginationChange.emit({ first: event.first, rows: event.rows });
  }

  extractNestedProperty<T>(
    item: T,
    key: string,
  ): string | number | Date | null | undefined {
    const value: unknown = this.resolvePath(item, key);

    if (this.isAllowedType(value)) {
      return value;
    }

    return null;
  }

  private resolvePath(item: unknown, key: string): unknown {
    return key.split('.').reduce((acc: unknown, k: string) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[k];
      }
      return undefined;
    }, item);
  }

  private isAllowedType(
    value: unknown,
  ): value is string | number | Date | null | undefined {
    if (value === null || value === undefined) {
      return true;
    }

    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value instanceof Date
    );
  }
}
