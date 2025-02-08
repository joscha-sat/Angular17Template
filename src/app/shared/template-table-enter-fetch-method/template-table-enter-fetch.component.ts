import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  input,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DatePipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { BaseGetQueryParams } from '../../other/types/Table.type';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';

export type FetchDataFunction<T> = (
  params: BaseGetQueryParams,
) => Observable<ResponseWithRecords<T>>;

@Component({
  selector: 'app-template-table-fetch',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    NgIf,
    NgTemplateOutlet,
    DatePipe,
    IsDatePipe,
  ],
  templateUrl: './template-table-enter-fetch.component.html',
  styleUrls: ['./template-table-enter-fetch.component.scss'],
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  fetchData = input.required<FetchDataFunction<T>>();
  headers = input.required<string[]>();
  displayedColumns = input.required<string[]>();
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};

  // fetch parameter signals
  search = input<string>('');
  debouncedSearch = signal('');

  searchDate = input<string>('');
  tabValueActive = input<boolean | undefined>(undefined);
  pageSizes = input<number[]>([5, 10, 25, 100]);
  initialPageSize = input<number>(10);

  totalItemsCount = signal<number>(0);
  limit = signal<number>(10);
  skip = signal<number>(0);
  tableData = signal<T[]>([]);

  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.subscribeToSearch();

    effect(() => {
      const params: BaseGetQueryParams = this.getQueryParams();
      this.fetchData()(params)
        .pipe(
          tap((response: ResponseWithRecords<T>) => {
            this.totalItemsCount.set(response.total);
          }),
          map((response) => response.records),
          catchError(() => of([])),
        )
        .subscribe((records) => {
          this.tableData.set(records);
        });
    });
  }

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
      .subscribe((event: PageEvent) => this.updatePaginationParams(event));
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

  pageChange(event: PageEvent) {
    console.log('triggered');
    this.updatePaginationParams(event);
  }

  // Helper method to update pagination parameters
  private updatePaginationParams(event: PageEvent): void {
    this.skip.set(event.pageIndex * event.pageSize);
    this.limit.set(event.pageSize);
  }

  // Helper method to encapsulate query params creation
  private getQueryParams(): BaseGetQueryParams {
    return {
      skip: this.skip(),
      limit: this.limit(),
      search: this.debouncedSearch(),
      searchDate: this.searchDate(),
      tabValueActive: this.tabValueActive(),
    };
  }

  // Helper method to subscribe to search changes with debounce
  private subscribeToSearch(): void {
    toObservable(this.search)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.debouncedSearch.set(value);
      });
  }
}
