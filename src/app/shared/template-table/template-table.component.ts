import {
  AfterViewInit,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-template-table',
  imports: [
    MatTableModule,
    MatPaginator,
    NgTemplateOutlet,
    DatePipe,
    IsDatePipe,
  ],
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

  readonly paginationChange: OutputEmitterRef<{ skip: number; limit: number }> =
    output<{
      skip: number;
      limit: number;
    }>();

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  readonly paginator: Signal<MatPaginator | undefined> =
    viewChild(MatPaginator);
  readonly sort: Signal<MatSort | undefined> = viewChild(MatSort);

  // hooks --------------------------------------------------- ||
  ngAfterViewInit(): void {
    this.setupDataSourcePaginator();
    this.setupDataSourceSort();
  }

  // methods --------------------------------------------------- ||
  setupDataSourcePaginator(): void {
    const paginator: MatPaginator | undefined = this.paginator();
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  setupDataSourceSort(): void {
    const sort: import('@angular/material/sort').MatSort | undefined =
      this.sort();
    if (sort) {
      this.dataSource.sort = sort;
    }
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
