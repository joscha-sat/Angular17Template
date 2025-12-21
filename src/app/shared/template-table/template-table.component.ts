import { AfterViewInit, Component, input, output, TemplateRef, viewChild, } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-template-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    NgTemplateOutlet,
    DatePipe,
    IsDatePipe,
  ],
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss',
})
export class TemplateTableComponent<T> implements AfterViewInit {
  headers = input.required<string[]>();
  displayedColumns = input.required<string[]>();
  readonly cellTemplatesMap = input<{
    [key: string]: TemplateRef<unknown>;
  }>({});

  tableData = input.required<T[]>();

  pageSizes = input<number[]>([5, 10, 25, 100]);
  initialPageSize = input<number>(10);
  totalItems = input<number>();

  paginationChange = output<{ skip: number; limit: number }>();

  dataSource = new MatTableDataSource<T>([]);

  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);

  // hooks --------------------------------------------------- ||
  ngAfterViewInit(): void {
    this.setupDataSourcePaginator();
    this.setupDataSourceSort();
  }

  // methods --------------------------------------------------- ||
  setupDataSourcePaginator(): void {
    const paginator = this.paginator();
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  setupDataSourceSort(): void {
    const sort = this.sort();
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  extractNestedProperty<T>(
    item: T,
    key: string,
  ): string | number | Date | null | undefined {
    const value = this.resolvePath(item, key);

    if (this.isAllowedType(value)) {
      return value;
    }

    return null;
  }

  private resolvePath(item: unknown, key: string): unknown {
    return key.split('.').reduce((acc, k) => {
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
