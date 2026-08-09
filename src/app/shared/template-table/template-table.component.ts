import {
  type AfterViewInit,
  Component,
  input,
  type InputSignal,
  output,
  type OutputEmitterRef,
  type Signal,
  type TemplateRef,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgTemplateOutlet } from '@angular/common';
import { MatPaginator, type PageEvent } from '@angular/material/paginator';
import { TemplateTableDefaultCellComponent } from '../template-table-default-cell/template-table-default-cell.component';

@Component({
  selector: 'app-template-table',
  imports: [MatTableModule, MatPaginator, NgTemplateOutlet, TemplateTableDefaultCellComponent],
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
  readonly totalItems: InputSignal<number | undefined> = input<number | undefined>();

  readonly paginationChange: OutputEmitterRef<{ skip: number; limit: number }> = output<{
    skip: number;
    limit: number;
  }>();

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  readonly paginator: Signal<MatPaginator | undefined> = viewChild(MatPaginator);
  readonly sort: Signal<MatSort | undefined> = viewChild(MatSort);

  private resolvePath(item: unknown, key: string): unknown {
    let currentValue: unknown = item;

    for (const pathSegment of key.split('.')) {
      if (!currentValue || typeof currentValue !== 'object') {
        return undefined;
      }

      currentValue = (currentValue as Record<string, unknown>)[pathSegment];
    }

    return currentValue;
  }

  private isAllowedType(value: unknown): value is string | number | Date | null | undefined {
    if (value === null || value === undefined) {
      return true;
    }

    return typeof value === 'string' || typeof value === 'number' || value instanceof Date;
  }

  // hooks --------------------------------------------------- ||
  ngAfterViewInit(): void {
    this.setupDataSourcePaginator();
    this.setupDataSourceSort();
  }

  handlePageEvent(event: PageEvent): void {
    this.paginationChange.emit({
      skip: event.pageIndex * event.pageSize,
      limit: event.pageSize,
    });
  }

  // methods --------------------------------------------------- ||
  setupDataSourcePaginator(): void {
    const paginator: MatPaginator | undefined = this.paginator();
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  setupDataSourceSort(): void {
    const sort: import('@angular/material/sort').MatSort | undefined = this.sort();
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  extractNestedProperty<T>(item: T, key: string): string | number | Date | null | undefined {
    const value: unknown = this.resolvePath(item, key);

    if (this.isAllowedType(value)) {
      return value;
    }

    return null;
  }
}
