import {
  Component,
  effect,
  input,
  Input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import {
  TuiTableModule,
  TuiTablePagination,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {
  AsyncPipe,
  DatePipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet,
} from '@angular/common';
import { TUI_DEFAULT_MATCHER, TuiLetModule } from '@taiga-ui/cdk';
import { TranslateModule } from '@ngx-translate/core';
import { ResponseWithRecords } from '../../api/base-http.service';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';

export type BaseFetchParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  searchDate?: string;
  tabValueActive?: boolean;
};

export type FetchDataFunction<T> = (
  params: BaseFetchParams,
) => Observable<ResponseWithRecords<T>>;

@Component({
  selector: 'app-base-table-async',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TuiTableModule,
    NgForOf,
    TuiTablePaginationModule,
    TuiLetModule,
    NgSwitchCase,
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchDefault,
    TranslateModule,
    DatePipe,
    IsDatePipe,
  ],
  templateUrl: './base-table-async.component.html',
  styleUrls: ['./base-table-async.component.scss'],
})
export class BaseTableAsyncComponent<T> {
  @Input({ required: true }) fetchData!: FetchDataFunction<T>;
  @Input({ required: true }) headers: string[] = [];
  @Input({ required: true }) columns: string[] = [];
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};

  // signal Inputs
  search = input<string>('');
  searchDate = input<string>('');
  tabValueActive = input<boolean | undefined>(undefined);

  rowClickEvent = output<any>();

  sortedColumn = this.columns[0];
  direction = 'asc';
  sizedData = signal<any[]>([]);
  size = signal<number>(10);
  page = signal<number>(0);
  total = signal<number>(0);
  public hasData = signal<boolean>(false);
  private searchText?: string;

  constructor() {
    effect(
      () => {
        const page = this.page();
        const size = this.size();
        const search = this.search();
        const searchDate = this.searchDate();
        const tabValueActive = this.tabValueActive();

        this.fetchWithParams({
          pageNumber: page,
          pageSize: size,
          search,
          searchDate,
          tabValueActive,
        }).subscribe((data) => {
          this.sizedData.set(data);
        });
      },
      { allowSignalWrites: true },
    );
  }

  isMatch(value: unknown): boolean {
    return !!this.searchText && TUI_DEFAULT_MATCHER(value, this.searchText);
  }

  fetchWithParams(queryParam: BaseFetchParams) {
    return this.fetchData(queryParam).pipe(
      tap((response) => {
        this.total.set(response.total);
        this.hasData.set(response.records && response.records.length > 0);
      }),
      map((response) => response.records),
      catchError(() => {
        this.hasData.set(false);
        return of([]);
      }),
    );
  }

  onChangePagination(event: TuiTablePagination) {
    this.page.set(event.page);
    this.size.set(event.size);
  }

  onSortChange(column: string) {
    this.sortedColumn = column;
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
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
