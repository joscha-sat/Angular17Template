// must have methods + attributes in tables
import { WritableSignal } from '@angular/core';
import { FetchDataFunction } from '../../shared/base-table-async/base-table-async.component';

export type Table<T> = {
  headers: WritableSignal<string[]>;
  columns: WritableSignal<string[]>;
  fetchDataFn: FetchDataFunction<T>;
};
