import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { FetchDataFunction } from '../../shared/base-table-async/base-table-async.component';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { ResponseWithRecords } from '../../api/base-http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-refresher',
  template: '',
  styles: '',
  standalone: true,
  imports: [],
})
export abstract class TableRefresherComponent<T> implements OnInit, OnDestroy {
  refresh$ = new BehaviorSubject(null);
  protected translateService = inject(TranslateService);
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.refreshDataSubscription();
  }

  translateHeaders(headers: WritableSignal<string[]>): void {
    forkJoin(headers().map((key) => this.translateService.get(key))).subscribe(
      (results) => {
        headers.set(results);
      },
    );
  }

  // Method must be implemented in each derived component
  abstract setTableRefreshService(): any;

  // Method must be implemented in each derived component
  abstract setTableRefreshMethodName(): string;

  // Optional method to override in derived components for additional parameters
  setAdditionalParams(): any {
    return null;
  }

  fetchDataFn: FetchDataFunction<T> = (
    page: number,
    size: number,
    search?: string,
    searchDate?: string,
    tabValueActive?: boolean,
  ) => {
    const additionalParams = this.setAdditionalParams();

    return this.refresh$.pipe(
      switchMap(
        () =>
          this.setTableRefreshService()[this.setTableRefreshMethodName()]({
            limit: size,
            skip: page * size,
            search,
            searchDate,
            tabValueActive,
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
