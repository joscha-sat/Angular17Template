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
  WritableSignal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
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

export type FetchDataFunction<T> = (
  params: BaseGetQueryParams,
) => Observable<ResponseWithRecords<T>>;

const DEFAULT_PAGE_SIZES: number[] = [5, 10, 25, 100];
const DEFAULT_PAGE_SIZE: number = 10;
const SEARCH_DEBOUNCE_TIME: number = 500;

@Component({
  selector: 'app-template-table-fetch',
  imports: [CommonModule, TableModule, PaginatorModule, DatePipe, IsDatePipe],
  standalone: true,
  templateUrl: './template-table-enter-fetch.component.html',
  styleUrl: './template-table-enter-fetch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateTableEnterFetchComponent<T> implements AfterViewInit {
  readonly fetchData: InputSignal<FetchDataFunction<T>> =
    input.required<FetchDataFunction<T>>();
  readonly headers: InputSignal<string[]> = input.required<string[]>();
  readonly displayedColumns: InputSignal<string[]> = input.required<string[]>();
  readonly cellTemplatesMap: InputSignal<Record<string, TemplateRef<unknown>>> =
    input<Record<string, TemplateRef<unknown>>>({});

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

  readonly totalItemsCount: WritableSignal<number> = signal(0);
  readonly limit: WritableSignal<number> = signal(this.initialPageSize());
  readonly skip: WritableSignal<number> = signal(0);
  readonly tableData: WritableSignal<T[]> = signal<T[]>([]);
  readonly debouncedSearch: WritableSignal<string> = signal('');
  readonly activeSort: WritableSignal<SortParamType | undefined> = signal<
    SortParamType | undefined
  >(this.initialSort());

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  first: number = 0;
  rows: number = 10;

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
    this.rows = this.initialPageSize();
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.skip.set(event.first);
    this.limit.set(event.rows);
  }

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

  private initializeReactiveFeatures(): void {
    this.syncSignalsWithInputs();
    this.setupSearchDebounce();
    this.setupDataFetchingSubscription();
  }

  private syncSignalsWithInputs(): void {
    effect(() => {
      this.limit.set(this.initialPageSize());
    });
  }

  private setupSearchDebounce(): void {
    toObservable(this.search)
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue: string) => {
        this.debouncedSearch.set(searchValue);
        this.first = 0;
        this.skip.set(0);
      });
  }

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
}
