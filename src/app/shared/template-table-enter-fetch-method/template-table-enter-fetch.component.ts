import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
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
const DEFAULT_PAGE_SIZES = [5, 10, 25, 100];
const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_TIME = 500; // milliseconds
const VALID_SORT_DIRECTIONS = ['ASC', 'DESC'];

@Component({
  selector: 'app-template-table-fetch',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
    IsDatePipe,
  ],
  templateUrl: './template-table-enter-fetch.component.html',
  styleUrls: ['./template-table-enter-fetch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Improves performance
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  // Required inputs for table functionality
  fetchData = input.required<FetchDataFunction<T>>(); // Function to fetch data
  headers = input.required<string[]>(); // Table column headers
  displayedColumns = input.required<string[]>(); // Columns to display
  cellTemplatesMap = input<Record<string, TemplateRef<any>>>({}); // Custom cell templates

  // Optional configuration inputs
  search = input(''); // Search term for filtering data
  searchDate = input(''); // Date filter value
  initialSort = input<SortParamType | undefined>(undefined); // Initial sort order
  tabValueActive = input<boolean | undefined>(undefined); // Filter for active tab
  pageSizes = input(DEFAULT_PAGE_SIZES); // Available page size options
  initialPageSize = input(DEFAULT_PAGE_SIZE); // Default page size

  // Reactive signals for internal state
  totalItemsCount = signal(0); // Total number of records available
  limit = signal(this.initialPageSize()); // Items per page
  skip = signal(0); // Number of items to skip (for pagination)
  tableData = signal<T[]>([]); // Actual data displayed in the table
  debouncedSearch = signal(''); // Search term after debounce
  activeSort = signal<SortParamType | undefined>(this.initialSort()); // Current sort configuration

  // View children for Material components
  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);

  // Injected dependencies
  private readonly destroyRef = inject(DestroyRef); // For cleanup subscriptions

  // Computed query parameters that combine all filter/sort/pagination settings
  private readonly queryParams = computed<BaseGetQueryParams>(() => ({
    skip: this.skip(),
    limit: this.limit(),
    search: this.debouncedSearch(),
    searchDate: this.searchDate(),
    sort: this.activeSort(),
    tabValueActive: this.tabValueActive(),
  }));

  constructor() {
    this.initializeTableState();
    this.setupSearchDebounce();
    this.setupDataFetchingSubscription();
  }

  ngAfterViewInit(): void {
    this.initializePaginator();
    this.initializeSort();
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
  extractNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current &&
        typeof current === 'object' &&
        Object.hasOwn(current, key)
        ? current[key]
        : null;
    }, obj);
  }

  // --- Private Setup Methods ---

  // Sets up the initial table state and synchronizes signals with inputs
  private initializeTableState(): void {
    effect(() => {
      this.limit.set(this.initialPageSize());
    });
  }

  // Debounces search input to avoid excessive API calls
  private setupSearchDebounce(): void {
    toObservable(this.search)
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME), // Wait for user to finish typing
        distinctUntilChanged(), // Only trigger on actual changes
        takeUntilDestroyed(this.destroyRef), // Automatic cleanup
      )
      .subscribe((searchValue) => {
        this.debouncedSearch.set(searchValue);
        this.resetPaginatorToFirstPage();
      });
  }

  // Resets to first page when search criteria change
  private resetPaginatorToFirstPage(): void {
    if (this.paginator()) {
      this.paginator()!.firstPage();
    }
    this.skip.set(0);
  }

  // Sets up subscription to fetch data whenever query parameters change
  private setupDataFetchingSubscription(): void {
    toObservable(this.queryParams)
      .pipe(
        switchMap((params) => this.fetchDataWithErrorHandling(params)), // Cancels previous requests
        takeUntilDestroyed(this.destroyRef), // Automatic cleanup
      )
      .subscribe((records) => this.tableData.set(records));
  }

  // Wraps data fetching with error handling and response processing
  private fetchDataWithErrorHandling(
    params: BaseGetQueryParams,
  ): Observable<T[]> {
    return this.fetchData()(params).pipe(
      tap((response) => this.totalItemsCount.set(response.total)), // Update total count
      map((response) => response.records), // Extract just the records
      catchError((error) => {
        console.error('Error fetching data:', error);
        this.totalItemsCount.set(0);
        return of([]); // Return empty array on error
      }),
    );
  }

  // Sets up the paginator with initial values
  private initializePaginator(): void {
    const paginatorInstance = this.paginator();
    if (paginatorInstance) {
      paginatorInstance.pageSize = this.initialPageSize();
    }
  }

  // Configures initial sort settings if provided
  private initializeSort(): void {
    const sortInstance = this.sort();
    const initialSortValue = this.initialSort();

    if (!sortInstance || initialSortValue === undefined) {
      return;
    }

    if (typeof initialSortValue === 'string') {
      this.applyInitialSortString(sortInstance, initialSortValue);
    } else {
      this.logInvalidSortTypeWarning(initialSortValue);
    }
  }

  // Parses and applies sort configuration from string format (e.g., "name,ASC")
  private applyInitialSortString(
    sortInstance: MatSort,
    sortString: string,
  ): void {
    const [field, directionStr] = sortString
      .split(',')
      .map((part) => part.trim());
    const direction = directionStr?.toUpperCase() as 'ASC' | 'DESC' | undefined;

    if (field && direction && VALID_SORT_DIRECTIONS.includes(direction)) {
      sortInstance.active = field; // Column to sort by
      sortInstance.direction = direction.toLowerCase() as SortDirection; // Direction (asc/desc)
    } else {
      this.logInvalidSortFormatWarning(sortString);
    }
  }

  // Logs a warning for invalid sort format
  private logInvalidSortFormatWarning(sortValue: string): void {
    console.warn(
      `[TemplateTableEnterFetchComponent] Invalid initialSort format: "${sortValue}". Expected "field,ASC" or "field,DESC".`,
    );
  }

  // Logs a warning for invalid sort type
  private logInvalidSortTypeWarning(value: unknown): void {
    console.warn(
      `[TemplateTableEnterFetchComponent] Invalid type for initialSort: Expected string, but got ${typeof value}.`,
    );
  }
}
