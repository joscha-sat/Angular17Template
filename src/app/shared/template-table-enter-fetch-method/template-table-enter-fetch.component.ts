import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  TemplateRef,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';
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
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import {
  BaseGetQueryParams,
  SortParamType,
} from '../../other/types/Table.type';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';

// Type for the function that fetches data from the server
export type FetchDataFunction<T> = (
  params: BaseGetQueryParams,
) => Observable<ResponseWithRecords<T>>;

// Constants for commonly used values to avoid magic numbers/strings
const DEFAULT_PAGE_SIZES: number[] = [5, 10, 25, 100];
const DEFAULT_PAGE_SIZE: number = 10;
const SEARCH_DEBOUNCE_TIME: number = 500; // milliseconds
const VALID_SORT_DIRECTIONS: string[] = ['ASC', 'DESC'];

@Component({
  selector: 'app-template-table-fetch',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
    IsDatePipe,
  ],
  standalone: true,
  templateUrl: './template-table-enter-fetch.component.html',
  styleUrl: './template-table-enter-fetch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  // Required inputs for table functionality
  readonly fetchData: InputSignal<FetchDataFunction<T>> =
    input.required<FetchDataFunction<T>>();
  readonly headers: InputSignal<string[]> = input.required<string[]>();
  readonly displayedColumns: InputSignal<string[]> = input.required<string[]>();
  readonly cellTemplatesMap: InputSignal<Record<string, TemplateRef<unknown>>> =
    input<Record<string, TemplateRef<unknown>>>({});

  // Optional configuration inputs
  readonly search: InputSignal<string> = input('');
  readonly searchDate: InputSignal<string> = input('');
  readonly initialSort: InputSignal<SortParamType | undefined> = input<
    SortParamType | undefined
  >(undefined);
  readonly tabValueActive: InputSignal<boolean | undefined> = input<
    boolean | undefined
  >(undefined);
  readonly pageSizes: InputSignal<number[]> = input(DEFAULT_PAGE_SIZES);
  readonly initialPageSize: InputSignal<number> = input(DEFAULT_PAGE_SIZE);

  // Reactive signals for internal state
  readonly totalItemsCount: WritableSignal<number> = signal(0);
  readonly limit: WritableSignal<number> = signal(this.initialPageSize());
  readonly skip: WritableSignal<number> = signal(0);
  readonly tableData: WritableSignal<T[]> = signal<T[]>([]);
  readonly debouncedSearch: WritableSignal<string> = signal('');
  readonly activeSort: WritableSignal<SortParamType | undefined> = signal<
    SortParamType | undefined
  >(this.initialSort());

  // View children for Material components
  readonly paginator: Signal<MatPaginator | undefined> =
    viewChild(MatPaginator);
  readonly sort: Signal<MatSort | undefined> = viewChild(MatSort);

  // Injected dependencies
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  // Computed query parameters that combine all filter/sort/pagination settings
  private readonly queryParams: Signal<BaseGetQueryParams> =
    computed<BaseGetQueryParams>(() => ({
      skip: this.skip(),
      limit: this.limit(),
      search: this.debouncedSearch(),
      searchDate: this.searchDate(),
      sort: this.activeSort(),
      tabValueActive: this.tabValueActive(),
    }));

  constructor() {
    this.initializeReactiveFeatures();
  }

  ngAfterViewInit(): void {
    this.initializeMatComponents();
  }

  // Updates pagination state when user changes page or page size
  handlePageEvent(event: PageEvent): void {
    this.skip.set(event.pageIndex * event.pageSize);
    this.limit.set(event.pageSize);
  }

  /**
   * Safely extracts a value from a potentially nested object structure.
   * Returns null if any part of the path is undefined or null.
   */
  extractNestedProperty<U>(
    obj: U,
    path: string,
  ): string | number | Date | null | undefined {
    return path
      .split('.')
      .reduce(
        (current: unknown, key: string) =>
          current && typeof current === 'object' && Object.hasOwn(current, key)
            ? (current as Record<string, unknown>)[key]
            : null,
        obj,
      ) as string | number | Date | null | undefined;
  }

  // --- Private Initialization Methods ---

  /**
   * Initializes all reactive features including signals synchronization,
   * search debouncing, and data fetching subscription
   */
  private initializeReactiveFeatures(): void {
    this.syncSignalsWithInputs();
    this.setupSearchDebounce();
    this.setupDataFetchingSubscription();
  }

  /**
   * Initializes Material Design components (paginator and sort)
   * after the view has been initialized
   */
  private initializeMatComponents(): void {
    this.initializePaginator();
    this.initializeSort();
  }

  // Sets up the initial table state and synchronizes signals with inputs
  private syncSignalsWithInputs(): void {
    effect(() => {
      this.limit.set(this.initialPageSize());
    });
  }

  // Debounces search input to avoid excessive API calls
  private setupSearchDebounce(): void {
    toObservable(this.search)
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue: string) => {
        this.debouncedSearch.set(searchValue);
        this.resetPaginatorToFirstPage();
      });
  }

  // Resets to first page when search criteria change
  private resetPaginatorToFirstPage(): void {
    if (this.paginator()) {
      this.paginator()?.firstPage();
    }
    this.skip.set(0);
  }

  // Sets up subscription to fetch data whenever query parameters change
  private setupDataFetchingSubscription(): void {
    toObservable(this.queryParams)
      .pipe(
        switchMap((params: BaseGetQueryParams) =>
          this.fetchDataWithErrorHandling(params),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((records: T[]) => this.tableData.set(records));
  }

  // Wraps data fetching with error handling and response processing
  private fetchDataWithErrorHandling(
    params: BaseGetQueryParams,
  ): Observable<T[]> {
    return this.fetchData()(params).pipe(
      tap((response: ResponseWithRecords<T>) =>
        this.totalItemsCount.set(response.total),
      ),
      map((response: ResponseWithRecords<T>) => response.records),
      catchError(() => {
        this.totalItemsCount.set(0);
        return of([]);
      }),
    );
  }

  // Sets up the paginator with initial values
  private initializePaginator(): void {
    const paginatorInstance: MatPaginator | undefined = this.paginator();
    if (paginatorInstance) {
      paginatorInstance.pageSize = this.initialPageSize();
    }
  }

  // Configures initial sort settings if provided
  private initializeSort(): void {
    const sortInstance: MatSort | undefined = this.sort();
    const initialSortValue: SortParamType | undefined = this.initialSort();
    if (!sortInstance || initialSortValue === undefined) {
      return;
    }
    if (typeof initialSortValue === 'string') {
      this.applyInitialSortString(sortInstance, initialSortValue);
    }
  }

  // Parses and applies sort configuration from string format (e.g., "name,ASC")
  private applyInitialSortString(
    sortInstance: MatSort,
    sortString: string,
  ): void {
    const [field, directionStr]: string[] = sortString
      .split(',')
      .map((part: string) => part.trim());
    const direction: 'ASC' | 'DESC' | undefined = directionStr.toUpperCase() as
      | 'ASC'
      | 'DESC'
      | undefined;
    if (field && direction && VALID_SORT_DIRECTIONS.includes(direction)) {
      sortInstance.active = field;
      sortInstance.direction = direction.toLowerCase() as SortDirection;
    }
  }
}
