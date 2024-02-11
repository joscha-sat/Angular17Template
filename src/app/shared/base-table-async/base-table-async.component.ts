import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from "rxjs";
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from "@angular/common";
import { TUI_DEFAULT_MATCHER, TuiLetModule } from "@taiga-ui/cdk";

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
  ],
  templateUrl: "./base-table-async.component.html",
  styleUrl: "./base-table-async.component.scss",
})
export class BaseTableAsyncComponent<T> implements OnInit {
  @Input() tableData$: Observable<T[]> = of([]);
  @Input() headers: string[] = [];
  @Input() columns: string[] = [];
  @Input() cellTemplatesMap: { [key: string]: TemplateRef<any> } = {};
  @Input() search: string = '';

  @Output() rowClickEvent = new EventEmitter();

  sortedColumn = this.columns[0];
  direction = "asc";

  sizedData$: Observable<any[]> | undefined;
  size$ = new BehaviorSubject<number>(10);
  page$ = new BehaviorSubject<number>(0);
  total$ = new BehaviorSubject<number>(0);

  isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  ngOnInit() {
    // Sorting data
    this.tableData$ = this.tableData$.pipe(
      map(data => this.sortData(data, this.sortedColumn, this.direction)),
    );

    // Combine latest values of page and size to paginate the sorted data.
    this.sizedData$ = combineLatest([this.tableData$, this.page$, this.size$]).pipe(
      switchMap(([data, page, size]) => {
        const startIndex = page * size;
        const endIndex = startIndex + size;
        this.total$.next(data.length);
        return of(data.slice(startIndex, endIndex));
      }),
    );
  }

  onChangePagination(event: TuiTablePagination) {
    this.page$.next(event.page);
    this.size$.next(event.size);
  }

  onSortChange(column: string) {
    this.sortedColumn = column;
    this.direction = this.direction === "asc" ? "desc" : "asc";
    this.tableData$ = this.tableData$.pipe(
      map(data => this.sortData(data, this.sortedColumn, this.direction)),
    );
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
      if (value && Object.prototype.hasOwnProperty.call(value, k)) {
        value = value[k];
      } else {
        return null;
      }
    }
    return value;
  }
}
