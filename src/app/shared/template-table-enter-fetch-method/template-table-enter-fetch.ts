import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  InputSignal,
  linkedSignal,
  type Signal,
  signal,
  type TemplateRef,
  type WritableSignal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { BaseGetQueryParams, SortParamType } from '../../other/types/Table.type';

export type TableDataSource<T> = {
  readonly entities: Signal<T[]>;
  readonly totalCount: Signal<number>;
  readonly loading: Signal<boolean>;
  sendLoadRequest: (parameters: BaseGetQueryParams) => void;
};

const DEFAULT_PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 100];
const DEFAULT_SELECTED_PAGE_SIZE: number = 10;
const SEARCH_FILTER_DEBOUNCE_TIME: number = 500;

@Component({
  selector: 'app-template-table-fetch',
  imports: [CommonModule, DatePipe, IsDatePipe, TableModule],
  templateUrl: './template-table-enter-fetch.html',
  styleUrl: './template-table-enter-fetch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateTableEnterFetch<T> {
  readonly tableDataSource: InputSignal<TableDataSource<T>> = input.required<TableDataSource<T>>();
  readonly columnHeaderLabels: InputSignal<string[]> = input.required<string[]>();
  readonly displayedPropertyColumns: InputSignal<string[]> = input.required<string[]>();
  readonly customCellTemplates: InputSignal<Record<string, TemplateRef<unknown>>> = input<
    Record<string, TemplateRef<unknown>>
  >({});

  readonly searchFilterText: InputSignal<string> = input('');
  readonly dateSearchFilter: InputSignal<string> = input('');
  readonly initialSortingConfiguration: InputSignal<SortParamType | undefined> = input<SortParamType | undefined>(
    undefined,
  );
  readonly activeTabFilterValue: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined);
  readonly availablePageSizeOptions: InputSignal<number[]> = input(DEFAULT_PAGE_SIZE_OPTIONS);
  readonly initialSelectedPageSize: InputSignal<number> = input(DEFAULT_SELECTED_PAGE_SIZE);
  readonly dataRefreshTrigger: InputSignal<number> = input(0);

  readonly currentSelectedPageSize: WritableSignal<number> = linkedSignal({
    source: this.initialSelectedPageSize,
    computation: () => this.initialSelectedPageSize(),
  });
  readonly currentPageStartIndex: WritableSignal<number> = signal(0);
  readonly debouncedSearchFilterText: WritableSignal<string> = signal('');
  readonly currentActiveSorting: WritableSignal<SortParamType | undefined> = signal<SortParamType | undefined>(
    this.initialSortingConfiguration(),
  );

  readonly tableRowData: Signal<T[]> = computed<T[]>(() => this.tableDataSource().entities());
  readonly totalRecordCount: Signal<number> = computed<number>(() => this.tableDataSource().totalCount());
  readonly isTableDataLoading: Signal<boolean> = computed<boolean>(() => this.tableDataSource().loading());

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly currentQueryParameters: Signal<BaseGetQueryParams> = computed<BaseGetQueryParams>(() => ({
    skip: this.currentPageStartIndex(),
    limit: this.currentSelectedPageSize(),
    search: this.debouncedSearchFilterText(),
    searchDate: this.dateSearchFilter(),
    sort: this.currentActiveSorting(),
    tabValueActive: this.activeTabFilterValue(),
  }));

  constructor() {
    this.fetchDataWhenQueryParametersChange();
    this.resetPaginationOnSearchTextChange();
    this.fetchDataWhenRefreshTriggered();
  }

  handlePageChange(event: { first: number; rows: number }): void {
    this.currentPageStartIndex.set(event.first);
    this.currentSelectedPageSize.set(event.rows);
  }

  retrieveNestedPropertyValue<U>(dataObject: U, propertyPath: string): string | number | Date | null | undefined {
    if (!dataObject || !propertyPath) {
      return null;
    }

    const propertyKeys: string[] = propertyPath.split('.');
    let currentValue: unknown = dataObject;

    for (const key of propertyKeys) {
      if (currentValue === null || currentValue === undefined || typeof currentValue !== 'object') {
        return null;
      }
      if (!Object.hasOwn(currentValue, key)) {
        return null;
      }
      currentValue = (currentValue as Record<string, unknown>)[key];
    }

    return currentValue as string | number | Date | null | undefined;
  }

  private fetchDataWhenQueryParametersChange(): void {
    toObservable(this.currentQueryParameters)
      .pipe(
        tap((parameters: BaseGetQueryParams) => this.tableDataSource().sendLoadRequest(parameters)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private resetPaginationOnSearchTextChange(): void {
    toObservable(this.searchFilterText)
      .pipe(
        debounceTime(SEARCH_FILTER_DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => this.currentPageStartIndex.set(0)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue: string) => {
        this.debouncedSearchFilterText.set(searchValue);
      });
  }

  private fetchDataWhenRefreshTriggered(): void {
    toObservable(this.dataRefreshTrigger)
      .pipe(
        skip(1),
        tap(() => this.tableDataSource().sendLoadRequest({ ...this.currentQueryParameters() })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
