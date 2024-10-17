import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import {
  BaseFetchParams,
  FetchDataFunction,
} from '../../shared/base-table/base-table.component';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';
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
  // Property to control whether to send parameters or not
  protected noParams: boolean = false;
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

  buildParams(baseParams: BaseFetchParams): any {
    if (this.noParams) {
      return {}; // Return an empty object if noParams is true
    }

    const active =
      baseParams.tabValueActive !== undefined
        ? String(baseParams.tabValueActive)
        : undefined;
    const additionalParams = this.setAdditionalParams();
    return {
      limit: baseParams.pageSize,
      skip: baseParams.pageNumber * baseParams.pageSize,
      search: baseParams.search,
      searchDate: baseParams.searchDate,
      active,
      ...additionalParams,
    };
  }

  fetchDataFn: FetchDataFunction<T> = (baseParams: BaseFetchParams) => {
    const params = this.buildParams(baseParams);
    const service = this.setTableRefreshService();
    const methodName = this.setTableRefreshMethodName();

    return this.refresh$.pipe(
      switchMap(
        () => service[methodName](params) as Observable<ResponseWithRecords<T>>,
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
