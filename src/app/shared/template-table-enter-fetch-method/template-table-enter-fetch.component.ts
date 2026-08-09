import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  type InputSignal,
  type Signal,
  signal,
  type TemplateRef,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, type SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, distinctUntilChanged, map, type Observable, of, switchMap, tap } from 'rxjs';
import type { BaseGetQueryParameters, SortParameterType } from '../../other/types/Table.type';
import type { ResponseWithRecords } from '../../api/base-http-service/base-http.service';
import { TemplateTableDefaultCellComponent } from '../template-table-default-cell/template-table-default-cell.component';

// Type for the function that fetches data from the server
export type FetchDataFunction<T> = (parameters: BaseGetQueryParameters) => Observable<ResponseWithRecords<T>>;

// Constants for commonly used values to avoid magic numbers/strings
const DEFAULT_PAGE_SIZES: number[] = [5, 10, 25, 100];
const DEFAULT_PAGE_SIZE: number = 10;
const SEARCH_DEBOUNCE_TIME: number = 500; // milliseconds
const VALID_SORT_DIRECTIONS: Set<string> = new Set(['ASC', 'DESC']);

@Component({
  selector: 'app-template-table-fetch',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, TemplateTableDefaultCellComponent],
  standalone: true,
  templateUrl: './template-table-enter-fetch.component.html',
  styleUrl: './template-table-enter-fetch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  // Injected dependencies
  private readonly componentDestroyRef: DestroyRef = inject(DestroyRef);

  // Computed query parameters that combine all filter/sort/pagination settings
  private readonly queryParams: Signal<BaseGetQueryParameters> = computed<BaseGetQueryParameters>(() => ({
    skip: this.skip(),
    limit: this.limit(),
    search: this.debouncedSearch(),
    searchDate: this.searchDate(),
    sort: this.activeSort(),
    tabValueActive: this.tabValueActive(),
  }));

  // Required inputs for table functionality
  readonly fetchData: InputSignal<FetchDataFunction<T>> = input.required<FetchDataFunction<T>>();
  readonly headers: InputSignal<string[]> = input.required<string[]>();
  readonly displayedColumns: InputSignal<string[]> = input.required<string[]>();
  // Fallow cannot trace Angular template reads for this input.
  readonly cellTemplatesMap: InputSignal<Record<string, TemplateRef<unknown>>> = input<
    Record<string, TemplateRef<unknown>>
  >({});

  // Optional configuration inputs
  readonly search: InputSignal<string> = input('');
  readonly searchDate: InputSignal<string> = input('');
  readonly initialSort: InputSignal<SortParameterType | undefined> = input<SortParameterType | undefined>(undefined);
  readonly tabValueActive: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined);
  readonly pageSizes: InputSignal<number[]> = input(DEFAULT_PAGE_SIZES);
  readonly initialPageSize: InputSignal<number> = input(DEFAULT_PAGE_SIZE);

  // Reactive signals for internal state
  readonly totalItemsCount: WritableSignal<number> = signal(0);
  readonly limit: WritableSignal<number> = linkedSignal<number, number>({
    source: this.initialPageSize,
    computation: (initialPageSize: number) => initialPageSize,
  });
  readonly skip: WritableSignal<number> = signal(0);
  readonly tableData: WritableSignal<T[]> = signal<T[]>([]);
  readonly debouncedSearch: WritableSignal<string> = signal('');
  readonly activeSort: WritableSignal<SortParameterType | undefined> = signal<SortParameterType | undefined>(
    this.initialSort(),
  );

  // View children for Material components
  readonly paginator: Signal<MatPaginator | undefined> = viewChild(MatPaginator);
  readonly sort: Signal<MatSort | undefined> = viewChild(MatSort);

  constructor() {
    this.initializeReactiveFeatures();
  }

  // --- Private Initialization Methods ---

  /**
   * Initializes all reactive features including signals synchronization,
   * search debouncing, and data fetching subscription
   */
  private initializeReactiveFeatures(): void {
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

  // Debounces search input to avoid excessive API calls
  private setupSearchDebounce(): void {
    toObservable(this.search)
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), distinctUntilChanged(), takeUntilDestroyed(this.componentDestroyRef))
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
        switchMap((parameters: BaseGetQueryParameters) => this.fetchDataWithErrorHandling(parameters)),
        takeUntilDestroyed(this.componentDestroyRef),
      )
      .subscribe((records: T[]) => this.tableData.set(records));
  }

  // Wraps data fetching with error handling and response processing
  private fetchDataWithErrorHandling(parameters: BaseGetQueryParameters): Observable<T[]> {
    return this.fetchData()(parameters).pipe(
      tap((response: ResponseWithRecords<T>) => this.totalItemsCount.set(response.total)),
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
    const initialSortValue: SortParameterType | undefined = this.initialSort();
    if (!sortInstance || initialSortValue === undefined) {
      return;
    }
    if (typeof initialSortValue === 'string') {
      this.applyInitialSortString(sortInstance, initialSortValue);
    }
  }

  // Parses and applies sort configuration from string format (e.g., "name,ASC")
  private applyInitialSortString(sortInstance: MatSort, sortString: string): void {
    const [field, directionString]: string[] = sortString.split(',').map((part: string) => part.trim());
    const direction: 'ASC' | 'DESC' | undefined = directionString.toUpperCase() as 'ASC' | 'DESC' | undefined;
    if (field && direction && VALID_SORT_DIRECTIONS.has(direction)) {
      sortInstance.active = field;
      sortInstance.direction = direction.toLowerCase() as SortDirection;
    }
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
  extractNestedProperty<U>(object: U, path: string): string | number | Date | null | undefined {
    let currentValue: unknown = object;

    for (const pathSegment of path.split('.')) {
      if (!currentValue || typeof currentValue !== 'object' || !Object.hasOwn(currentValue, pathSegment)) {
        return null;
      }

      currentValue = (currentValue as Record<string, unknown>)[pathSegment];
    }

    return currentValue as string | number | Date | null | undefined;
  }
}
