import {
  Component,
  effect,
  inject,
  input,
  Input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import {
  TuiTable,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { DatePipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { TranslateModule } from '@ngx-translate/core';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';
import { IsDatePipe } from '../../other/pipes/is-date.pipe';
import { TUI_DARK_MODE } from '@taiga-ui/core';

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
  selector: 'app-base-table',
  imports: [
    NgIf,
    TuiTable,
    NgForOf,
    TuiTablePagination,
    NgTemplateOutlet,
    TranslateModule,
    DatePipe,
    IsDatePipe,
  ],
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<T> implements OnInit {
  @Input({ required: true }) fetchData!: FetchDataFunction<T>;
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};

  // signal Inputs
  headers = input.required<string[]>();
  columns = input.required<string[]>();
  search = input<string>('');
  searchDate = input<string>('');
  tabValueActive = input<boolean | undefined>(undefined);

  // Output events
  rowClickEvent = output<any>();

  sortedColumn = signal('');
  direction = signal('asc');
  sizedData = signal<any[]>([]);
  size = signal<number>(10);
  page = signal<number>(0);
  total = signal<number>(0);
  public hasData = signal<boolean>(false);

  darkMode = inject(TUI_DARK_MODE);

  constructor() {
    effect(
      () => {
        const params = {
          pageNumber: this.page(),
          pageSize: this.size(),
          search: this.search(),
          searchDate: this.searchDate(),
          tabValueActive: this.tabValueActive(),
        };

        this.fetchWithParams(params).subscribe((data) => {
          this.sizedData.set(data);
        });
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.sortedColumn.set(this.columns()[0]);
  }

  isMatch(value: unknown): boolean {
    return !!this.search() && TUI_DEFAULT_MATCHER(value, this.search());
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

  onChangePagination(event: TuiTablePaginationEvent) {
    this.page.set(event.page);
    this.size.set(event.size);
  }

  onSortChange(column: string) {
    this.sortedColumn.set(column);
    this.direction.set(this.direction() === 'asc' ? 'desc' : 'asc');
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

  // sortData(data: any[], column: any, direction: any): any[] {
  //   return data.sort((a: any, b: any) => {
  //     let aColValue = a[column];
  //     let bColValue = b[column];
  //
  //     if (!isNaN(Number(aColValue)) && !isNaN(Number(bColValue))) {
  //       aColValue = Number(aColValue);
  //       bColValue = Number(bColValue);
  //     }
  //
  //     if (aColValue < bColValue) {
  //       return direction === 'asc' ? -1 : 1;
  //     } else if (aColValue > bColValue) {
  //       return direction === 'asc' ? 1 : -1;
  //     }
  //
  //     return 0;
  //   });
  // }
}
