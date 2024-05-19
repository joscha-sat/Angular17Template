import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchDataFunction } from '../base-table-async/base-table-async.component';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { ResponseWithRecords } from '../../api/base-http.service';

@Component({
  selector: 'app-table-refresher',
  standalone: true,
  imports: [],
  templateUrl: './table-refresher.component.html',
  styleUrl: './table-refresher.component.scss',
})
export abstract class TableRefresherComponent<T> implements OnInit, OnDestroy {
  refresh$ = new BehaviorSubject(null);
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.refreshDataSubscription();
  }

  // Method must be implemented in each derived component
  abstract setTableRefreshService(): any;

  // Method must be implemented in each derived component
  abstract setTableRefreshMethodName(): string;

  // Optional method to override in derived components for additional parameters
  setAdditionalParams(): any {
    return null;
  }

  fetchDataFn: FetchDataFunction<T> = (page: number, size: number) => {
    const additionalParams = this.setAdditionalParams();

    return this.refresh$.pipe(
      switchMap(
        () =>
          this.setTableRefreshService()[this.setTableRefreshMethodName()]({
            limit: size,
            skip: page * size,
            ...additionalParams,
          }) as Observable<ResponseWithRecords<T>>,
      ),
    );
  };

  refreshDataSubscription() {
    this.subscription =
      this.setTableRefreshService().refreshObservable$.subscribe(() => {
        this.refresh$.next(null);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
