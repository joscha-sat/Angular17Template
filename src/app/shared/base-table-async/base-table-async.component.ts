import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, switchMap, tap } from "rxjs";
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from "@angular/common";
import { TUI_DEFAULT_MATCHER, TuiLetModule } from "@taiga-ui/cdk";
import { TranslateModule } from "@ngx-translate/core";
import { ResponseWithRecords } from "../../api/generic-http.service";

export type FetchDataFunction<T> = (pageNumber: number, pageSize: number) => Observable<ResponseWithRecords<T>>;

@Component({
  selector: "app-base-table-async",
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
  ],
  templateUrl: "./base-table-async.component.html",
  styleUrl: "./base-table-async.component.scss",
})
export class BaseTableAsyncComponent<T> implements OnInit {
  @Input({ required: true }) headers: string[] = [];
  @Input({ required: true }) columns: string[] = [];
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};
  @Input() search: string = '';
  @Input({ required: true }) fetchData!: FetchDataFunction<T>;

  @Output() rowClickEvent = new EventEmitter();

  sortedColumn = this.columns[0];
  direction = "asc";

  sizedData$: Observable<any[]> | undefined;
  size$ = new BehaviorSubject<number>(10);
  page$ = new BehaviorSubject<number>(0);
  total$ = new BehaviorSubject<number>(0);
  public hasData = new BehaviorSubject<boolean>(false);

  isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  ngOnInit() {
    this.sizedData$ = combineLatest([this.page$, this.size$]).pipe(
      switchMap(([page, size]) =>
        this.fetchData(page, size).pipe(
          tap(response => {
            this.total$.next(response.total);
            this.hasData.next((response.records && response.records.length > 0));
          }),
          map(response => response.records),
          catchError(() => {
            // in case of error, display empty state
            this.hasData.next(false);
            return of([]);
          })
        )
      ),
    );
  }


  onChangePagination(event: TuiTablePagination) {
    this.page$.next(event.page);
    this.size$.next(event.size);
  }

  onSortChange(column: string) {
    this.sortedColumn = column;
    this.direction = this.direction === "asc" ? "desc" : "asc";

    // TODO: implement backend sort

    // this.tableData$ = this.tableData$.pipe(
    //   map(data => this.sortData(data, this.sortedColumn, this.direction)),
    // );
  }

  sortData(data: any[], column: any, direction: any): any[] {
    return data.sort((a: any, b: any) => {
      let aColValue = a[column];
      let bColValue = b[column];

      if (!isNaN(Number(aColValue)) && !isNaN(Number(bColValue))) {
        aColValue = Number(aColValue);
        bColValue = Number(bColValue);
      }

      if (aColValue < bColValue) {
        return direction === "asc" ? -1 : 1;
      } else if (aColValue > bColValue) {
        return direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  extractNestedProperty(item: any, key: string): any {
    const keys = key.split(".");
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
