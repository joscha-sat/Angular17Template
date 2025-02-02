import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  input,
  output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';

@Component({
  selector: 'app-template-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    NgIf,
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
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};

  tableData = input.required<T[]>();

  pageSizes = input<number[]>([5, 10, 25, 100]);
  initialPageSize = input<number>(10);
  totalItems = input<number>();

  paginationChange = output<{ skip: number; limit: number }>();

  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  private destroyRef = inject(DestroyRef);

  // hooks --------------------------------------------------- ||

  ngAfterViewInit() {
    this.setupDataSourcePaginator();
    this.setupDataSourceSort();
  }

  // methods --------------------------------------------------- ||

  emitSkipLimitOnPaginatorChange() {
    if (!this.paginator) return;

    this.paginator.page
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const skip = event.pageIndex * event.pageSize;
        const limit = event.pageSize;
        this.paginationChange.emit({ skip, limit });
      });
  }

  setupDataSourcePaginator() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.emitSkipLimitOnPaginatorChange();
    }
  }

  setupDataSourceSort() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
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
