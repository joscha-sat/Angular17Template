import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { ResponseWithRecords } from '../../api/base-http-service/base-http.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseGetQueryParams } from '../types/Table.type';
import { FetchDataFunction } from '../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';

@Component({
  selector: 'app-table-refresher',
  imports: [],
  template: '',
  styles: '',
})
export abstract class BaseTableComponent<T> implements OnInit, OnDestroy {
  refresh$: BehaviorSubject<null> = new BehaviorSubject<null>(null); // Emits when data needs to be refreshed
  protected translateService: TranslateService = inject(TranslateService); // Translation service
  protected noParams: boolean = false; // Flag to skip sending params
  private subscription: Subscription | undefined; // Subscription for refresh

  ngOnInit(): void {
    this.refreshDataSubscription(); // Initialize refresh subscription
  }

  // Translates table headers using the translation service
  translateHeaders(headers: WritableSignal<string[]>): void {
    forkJoin(
      headers().map((key: string) =>
        key ? this.translateService.get(key) : of(''),
      ),
    ).subscribe((results: string[]) => headers.set(results));
  }

  abstract setTableRefreshService(): {
    refreshObservable$: Observable<unknown>;
  }; // Must return the service to refresh data
  abstract setTableRefreshMethodName(): string; // Must return the method name to call

  setCustomParams(): Record<string, unknown> | null {
    return null;
  } // Optional: override to add extra params

  // Builds query params, skips if noParams is true
  buildParams(baseParams: BaseGetQueryParams): Record<string, unknown> {
    if (this.noParams) {
      return {};
    }
    return {
      limit: baseParams.limit,
      skip: baseParams.skip,
      search: baseParams.search,
      sort: baseParams.sort,
      searchDate: baseParams.searchDate,
      active:
        baseParams.tabValueActive !== undefined
          ? String(baseParams.tabValueActive)
          : undefined,
      ...this.setCustomParams(),
    };
  }

  // Fetches data using the service and method defined in derived components
  fetchDataFn: FetchDataFunction<T> = (baseParams: BaseGetQueryParams) => {
    const params: Record<string, unknown> = this.buildParams(baseParams);
    const service: {
      refreshObservable$: Observable<unknown>;
    } = this.setTableRefreshService();
    const methodName: string = this.setTableRefreshMethodName();

    // Type assertion to allow accessing methods by string key
    const serviceWithMethods: { [key: string]: unknown } = service as {
      [key: string]: unknown;
    };

    // Explicitly cast the return type to Observable<ResponseWithRecords<T>>
    return this.refresh$.pipe(
      switchMap(
        () =>
          (
            serviceWithMethods[methodName] as (
              params: unknown,
            ) => Observable<ResponseWithRecords<T>>
          )(params) as Observable<ResponseWithRecords<T>>,
      ),
    );
  };

  // Subscribes to refresh events and triggers data refresh
  refreshDataSubscription(): void {
    this.subscription =
      this.setTableRefreshService().refreshObservable$.subscribe(() =>
        this.refresh$.next(null),
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Cleanup on component destroy
  }
}
