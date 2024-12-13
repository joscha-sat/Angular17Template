// must have methods + attributes in tables
import { WritableSignal } from '@angular/core';

export type Table<T> = {
  headers: WritableSignal<string[]>;
  columns: WritableSignal<(keyof T | 'delete' | 'edit')[]>;
};
