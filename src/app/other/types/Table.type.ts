// must have methods + attributes in tables
import type { WritableSignal } from '@angular/core';

export type Table<T> = {
  headers: WritableSignal<string[]>;
  columns: WritableSignal<(keyof T | 'delete' | 'edit')[]>;
};

export type SortParameterType = `${string},ASC` | `${string},DESC`;

export type BaseGetQueryParameters = {
  skip: number;
  limit: number;
  search?: string;
  searchDate?: string;
  sort?: SortParameterType;
  tabValueActive?: boolean;
};
