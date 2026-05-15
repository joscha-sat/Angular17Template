import { Directive, inject, type OnDestroy, type OnInit, signal, type WritableSignal } from '@angular/core';
import { type Observable, Subscription } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { type TableDataSource } from '../../shared/template-table-enter-fetch-method/template-table-enter-fetch';

@Directive()
export abstract class SignalStoreTable<T> implements OnInit, OnDestroy {
  protected abstract createTableDataSource(): TableDataSource<T>;
  protected abstract readonly onDataChanged$: Observable<unknown>;
  abstract readonly headers: WritableSignal<string[]>;
  abstract readonly columns: WritableSignal<string[]>;

  tableDataSource!: TableDataSource<T>;
  protected readonly refreshCounter: WritableSignal<number> = signal<number>(0);
  protected readonly translocoService: TranslocoService = inject(TranslocoService);
  private refreshSubscription?: Subscription;

  ngOnInit(): void {
    this.tableDataSource = this.createTableDataSource();
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
