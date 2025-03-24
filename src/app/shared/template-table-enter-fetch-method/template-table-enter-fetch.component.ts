import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import {
  BaseGetQueryParams,
  SortParamType,
} from '../../other/types/Table.type';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';

export type FetchDataFunction<T> = (
  params: BaseGetQueryParams,
) => Observable<ResponseWithRecords<T>>;

@Component({
  selector: 'app-template-table-fetch',
  standalone: true,
  imports: [MatTableModule, MatPaginator, IsDatePipe],
  templateUrl: './template-table-enter-fetch.component.html',
  styleUrls: ['./template-table-enter-fetch.component.scss'],
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  fetchData = input.required<FetchDataFunction<T>>();
  headers = input.required<string[]>();
  displayedColumns = input.required<string[]>();
  readonly cellTemplatesMap = input<{
    [key: string]: TemplateRef<any>;
  }>({});

  // Input/Signals for search, pagination, etc.
  search = input<string>('');
  debouncedSearch = signal('');

  searchDate = input<string>('');
  sortValue = input<SortParamType | undefined>(undefined);
  tabValueActive = input<boolean | undefined>(undefined);
  pageSizes = input<number[]>([5, 10, 25, 100]);
  initialPageSize = input<number>(10);

  totalItemsCount = signal<number>(0);
  limit = signal<number>(10);
  skip = signal<number>(0);
  tableData = signal<T[]>([]);

  dataSource = new MatTableDataSource<T>([]);

  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);
  private destroyRef = inject(DestroyRef);

  // Create a computed signal that derives the query parameters.
  private queryParams = computed<BaseGetQueryParams>(() => ({
    skip: this.skip(),
    limit: this.limit(),
    search: this.debouncedSearch(),
    searchDate: this.searchDate(),
    sort: this.sortValue(),
    tabValueActive: this.tabValueActive(),
  }));

  constructor() {
    this.subscribeToSearch();
    this.subscribeToQueryParams();
  }

  ngAfterViewInit() {
    this.setupDataSourcePaginator();
    this.setupDataSourceSort();
  }

  // Called on manual page change (if needed)
  pageChange(event: PageEvent) {
    this.updatePaginationParams(event);
  }

  // This subscription will react to changes of the computed query parameters,

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

  // which includes pagination changes.
  private subscribeToQueryParams(): void {
    toObservable(this.queryParams)
      .pipe(
        // adjust debounce time if necessary
        debounceTime(100),
        // Use a custom distinct comparison
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
        // Cancel previous request and switch to new one.
        switchMap((params) => {
          return this.fetchData()(params).pipe(
            tap((response: ResponseWithRecords<T>) => {
              this.totalItemsCount.set(response.total);
            }),
            map((response) => response.records),
            catchError(() => of([])),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((records) => {
        this.tableData.set(records);
      });
  }

  // Paginator setup
  private emitSkipLimitOnPaginatorChange() {
    const paginator = this.paginator();
    if (!paginator) return;
    paginator.page
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event: PageEvent) => this.updatePaginationParams(event));
  }

  private setupDataSourcePaginator() {
    const paginator = this.paginator();
    if (paginator) {
      this.dataSource.paginator = paginator;
      this.emitSkipLimitOnPaginatorChange();
    }
  }

  private setupDataSourceSort() {
    const sort = this.sort();
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  // Update skip and limit signals for pagination.
  private updatePaginationParams(event: PageEvent): void {
    this.skip.set(event.pageIndex * event.pageSize);
    this.limit.set(event.pageSize);
  }
}
