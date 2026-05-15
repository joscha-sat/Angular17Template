import { Directive, inject, type OnDestroy, type OnInit, signal, type WritableSignal } from '@angular/core';
import { type Observable, Subscription } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { type TableDataSource } from '../../shared/template-table-enter-fetch-method/template-table-enter-fetch';

export type TableColumnConfig = {
  displayedColumns: string[];
  headers: string[];
};

@Directive()
export abstract class SignalStoreTable<T> implements OnInit, OnDestroy {
  // Set tableDataSource and onDataChanged$ as field initializers in the child.
  // No more abstract createTableDataSource() that generates throw-error stubs.
  protected onDataChanged$!: Observable<unknown>;
  // Define column config as a typed const in the child:
  //   const COLUMN_CONFIG: { displayedColumns: string[]; headers: string[] } = { ... };
  //   protected override readonly columnConfig = COLUMN_CONFIG;
  protected abstract readonly columnConfig: TableColumnConfig;

  readonly columns: WritableSignal<string[]> = signal<string[]>([]);
  readonly headers: WritableSignal<string[]> = signal<string[]>([]);
  protected tableDataSource!: TableDataSource<T>;
  protected readonly refreshCounter: WritableSignal<number> = signal<number>(0);
  protected readonly translocoService: TranslocoService = inject(TranslocoService);
  private refreshSubscription?: Subscription;

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
    this.refreshSubscription = this.onDataChanged$.subscribe(() => {
      this.refreshCounter.update((currentCount: number) => currentCount + 1);
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }
}
