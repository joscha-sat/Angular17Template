import {
  AfterViewInit,
  Component,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  pageSizes = input<number[]>([5, 10, 25, 100]);
  totalItems = input<number>();

  paginationChange = output<{ skip: number; limit: number }>();

  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  emitSkipLimitOnPaginatorChange() {
    this.paginator?.page.subscribe((event) => {
      const skip = event.pageIndex * event.pageSize;
      const limit = event.pageSize;
      this.paginationChange.emit({ skip, limit });
    });
  }

  // Modify ngAfterViewInit
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.emitSkipLimitOnPaginatorChange();
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
