import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-template-table',
  imports: [NgTemplateOutlet, DatePipe, IsDatePipe, TableModule],
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss',
})
export class TemplateTableComponent<T> {
  readonly headers: InputSignal<string[]> = input.required<string[]>();
  readonly displayedColumns: InputSignal<string[]> = input.required<string[]>();
  readonly cellTemplatesMap: InputSignal<Record<string, TemplateRef<unknown>>> = input<
    Record<string, TemplateRef<unknown>>
  >({});

  readonly tableData: InputSignal<T[]> = input.required<T[]>();

  readonly pageSizes: InputSignal<number[]> = input<number[]>([5, 10, 25, 100]);
  readonly initialPageSize: InputSignal<number> = input<number>(10);
  readonly totalItems: InputSignal<number | undefined> = input<number | undefined>();

  readonly paginationChange: OutputEmitterRef<{ first: number; rows: number }> = output<{
    first: number;
    rows: number;
  }>();

  readonly currentPageFirstIndex: WritableSignal<number> = signal(0);
  readonly currentPageSize: WritableSignal<number> = signal(this.initialPageSize());

  handlePageChange(event: { first: number; rows: number }): void {
    this.currentPageFirstIndex.set(event.first);
    this.currentPageSize.set(event.rows);
    this.paginationChange.emit({ first: event.first, rows: event.rows });
  }

  extractNestedProperty<TItem>(
    item: TItem,
    key: string,
  ): string | number | Date | null | undefined {
    const resolvedValue: unknown = this.resolvePropertyPath(item, key);

    if (this.isValidDisplayType(resolvedValue)) {
      return resolvedValue;
    }

    return null;
  }

  private resolvePropertyPath(item: unknown, key: string): unknown {
    return key.split('.').reduce((accumulator: unknown, segment: string) => {
      if (accumulator && typeof accumulator === 'object') {
        return (accumulator as Record<string, unknown>)[segment];
      }
      return undefined;
    }, item);
  }

  private isValidDisplayType(value: unknown): value is string | number | Date | null | undefined {
    if (value === null || value === undefined) {
      return true;
    }

    return typeof value === 'string' || typeof value === 'number' || value instanceof Date;
  }
}
