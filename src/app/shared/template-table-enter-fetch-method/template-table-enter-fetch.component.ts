import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  input,
  output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
  styleUrl: './template-table-enter-fetch.component.scss',
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  fetchData = input.required<FetchDataFunction<T>>();
  headers = input.required<string[]>();
  displayedColumns = input.required<string[]>();
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};

  // fetch parameter signals
  search = input<string>('');
  // Create an intermediary debounced signal for search
  debouncedSearch = signal('');

  searchDate = input<string>('');
  tabValueActive = input<boolean | undefined>(undefined);

  pageSizes = input<number[]>([5, 10, 25, 100]);
  initialPageSize = input<number>(10);

  totalItemsCount = signal<number>(0);
  limit = signal<number>(10);
  skip = signal<number>(0);

  paginationChange = output<{ skip: number; limit: number }>();

  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  private destroyRef = inject(DestroyRef);

  constructor() {
    toObservable(this.search)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.debouncedSearch.set(value);
      });

    effect(() => {
      const params: BaseGetQueryParams = {
        skip: this.skip(),
        limit: this.limit(),
        search: this.debouncedSearch(),
        searchDate: this.searchDate(),
        tabValueActive: this.tabValueActive(),
      };

      this.fetchData()(params)
        .pipe(
          tap((response: ResponseWithRecords<T>) => {
            this.totalItemsCount.set(response.total);
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          }),
          map((response) => response.records),
          catchError(() => of([])),
        )
        .subscribe((records) => {
          this.dataSource.data = records;
        });
    });

    effect(() => {
      const total = this.totalItemsCount();
      if (this.paginator) {
        this.paginator.length = total;
      }
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
      .subscribe((event) => {
        this.skip.set(event.pageIndex * event.pageSize);
        this.limit.set(event.pageSize);
        this.paginationChange.emit({ skip: this.skip(), limit: this.limit() });
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
