// must have methods + attributes in tables
import { WritableSignal } from '@angular/core';

export type Table<T> = {
  headers: WritableSignal<string[]>;
  columns: WritableSignal<(keyof T | 'delete' | 'edit')[]>;
};

export type BaseGetQueryParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  searchDate?: string;
  tabValueActive?: boolean;
};
