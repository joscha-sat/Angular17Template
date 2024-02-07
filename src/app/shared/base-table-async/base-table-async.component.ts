import { Component, Input, OnInit } from "@angular/core";
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from "rxjs";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-base-table-async",
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TuiTableModule,
    NgForOf,
    TuiTablePaginationModule,
  ],
  templateUrl: "./base-table-async.component.html",
  styleUrl: "./base-table-async.component.scss",
})
export class BaseTableAsyncComponent<T> implements OnInit {
  @Input({ required: true }) tableData$: Observable<T[]> = of([]);
  @Input({ required: true }) headers: string[] = [];
  @Input({ required: true }) columns: string[] = [];

  sizedData$: Observable<T[]> | undefined;
  size$ = new BehaviorSubject<number>(10);
  page$ = new BehaviorSubject<number>(0);
  total$ = new BehaviorSubject<number>(0);

  ngOnInit() {
    // Combine latest values of page and size to paginate the data.
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
