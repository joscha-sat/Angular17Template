import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';

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
    [key: string]: TemplateRef<any>;
  }>({});

  tableData = input.required<T[]>();

  pageSizes = input<number[]>([5, 10, 25, 100]);
  initialPageSize = input<number>(10);
  totalItems = input<number>();

  paginationChange = output<{ skip: number; limit: number }>();

  dataSource = new MatTableDataSource<T>([]);

  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);

  private destroyRef = inject(DestroyRef);

  // hooks --------------------------------------------------- ||

  ngAfterViewInit() {
    this.setupDataSourcePaginator();
    this.setupDataSourceSort();
  }

  // methods --------------------------------------------------- ||
  setupDataSourcePaginator() {
    const paginator = this.paginator();
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  setupDataSourceSort() {
    const sort = this.sort();
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  extractNestedProperty(item: any, key: string): any {
    const keys = key.split('.');
    let value = item;

    for (const k of keys) {
      if (value && Object.hasOwn(value, k)) {
        value = value[k];
      } else {
        return null;
      }
    }
    return value;
  }
}
