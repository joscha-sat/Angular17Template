// must have methods + attributes in tables
import { WritableSignal } from '@angular/core';
import { FetchDataFunction } from '../../shared/base-table/base-table.component';

export type Table<T> = {
  headers: WritableSignal<string[]>;
  columns: WritableSignal<(keyof T | 'delete' | 'edit')[]>;
  fetchDataFn: FetchDataFunction<T>;
};
