// must have methods + attributes in tables
import { WritableSignal } from '@angular/core';

export type Table<T> = {
  headers: WritableSignal<string[]>;
  columns: WritableSignal<(keyof T | 'delete' | 'edit')[]>;
};

export type BaseGetQueryParams = {
  skip: number;
  limit: number;
  search?: string;
  searchDate?: string;
  tabValueActive?: boolean;
};
