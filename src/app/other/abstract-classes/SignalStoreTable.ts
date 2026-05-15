import {
  Directive,
  inject,
  type OnDestroy,
  type OnInit,
  type Signal,
  signal,
  type WritableSignal,
} from '@angular/core';
import { type Observable, Subscription } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { type TableDataSource } from '../../shared/template-table-enter-fetch-method/template-table-enter-fetch';

export type TableColumnConfig = {
  displayedColumns: string[];
  headers: string[];
};

export type StoreLike<T> = {
  entities: Signal<T[]>;
  totalCount: Signal<number>;
  loading: Signal<boolean>;
};

@Directive()
export abstract class SignalStoreTable<T> implements OnInit, OnDestroy {
  protected abstract readonly columnConfig: TableColumnConfig;
  protected abstract readonly service: { refreshObservable$: Observable<unknown> };

  readonly columns: WritableSignal<string[]> = signal<string[]>([]);
  readonly headers: WritableSignal<string[]> = signal<string[]>([]);
  protected readonly refreshCounter: WritableSignal<number> = signal<number>(0);
  protected readonly translocoService: TranslocoService = inject(TranslocoService);
  protected tableDataSource!: TableDataSource<T>;
  private refreshSubscription?: Subscription;

  protected createTableDataSource(
    store: StoreLike<T>,
    sendLoadRequest: (parameters: unknown) => void,
  ): TableDataSource<T> {
    return {
      entities: store.entities,
      totalCount: store.totalCount,
      loading: store.loading,
      sendLoadRequest,
    };
  }

  ngOnInit(): void {
    this.columns.set(this.columnConfig.displayedColumns);
    this.headers.set(this.columnConfig.headers);
    this.translateHeaders(this.headers);
    this.subscribeToDataChanges();
  }

  protected translateHeaders(headers: WritableSignal<string[]>): void {
    const translations: string[] = headers().map((key: string) => (key ? this.translocoService.translate(key) : ''));
    headers.set(translations);
  }

  private subscribeToDataChanges(): void {
    this.refreshSubscription = this.service.refreshObservable$.subscribe(() => {
      this.refreshCounter.update((currentCount: number) => currentCount + 1);
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }
}
