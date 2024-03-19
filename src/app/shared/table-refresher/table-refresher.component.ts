import { Component } from '@angular/core';
import { FetchDataFunction } from "../base-table-async/base-table-async.component";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { ResponseWithRecords } from "../../api/generic-http.service";

@Component({
  selector: 'app-table-refresher',
  standalone: true,
  imports: [],
  templateUrl: './table-refresher.component.html',
  styleUrl: './table-refresher.component.scss'
})
export abstract class TableRefresherComponent<T> {
  refresh$ = new BehaviorSubject(null);

  ngOnInit(): void {
    this.refreshDataSubscription();
  }

  // Method must be implemented in each derived component
  abstract getService(): any;

  // Method must be implemented in each derived component
  abstract getServiceMethodName(): string;

  fetchDataFn: FetchDataFunction<T> = (page: number, size: number) => {
    return this.refresh$.pipe(
      switchMap(() =>
        this.getService()[this.getServiceMethodName()]({
          limit: size,
          skip: page * size
        }) as Observable<ResponseWithRecords<T>>
      )
    );
  };

  refreshDataSubscription() {
    this.getService().refreshTenants$.subscribe(() => {
      this.refresh$.next(null);
    });
  }
}
