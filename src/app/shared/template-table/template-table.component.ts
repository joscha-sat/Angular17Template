import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-template-table',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss',
})
export class TemplateTableComponent<T> implements AfterViewInit {
  headers = input.required<string[]>();
  displayedColumns = input.required<string[]>();
  tableData = input.required<T[]>();
  pageSizes = input<number[]>([10, 25, 100]);
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
}
