/**
 * Filter event for table containing a search term and tab index
 */
export type TableFilterEvent = {
  searchTerm: string;
  tabIndex: number; // 0 = all, 1 = active, 2 = inactive
};

/**
 * PaginationEvent contains the start and limit values for pagination.
 */
export type PaginationEvent = {
  start: number;
  limit: number;
};

/**
 * Table sort event containing the column to sort by and the direction (ascending or descending)
 */
export type TableSortEvent = {
  sortColumn: string;
  sortDirection: number; // -1 = descending, 1 = ascending
};
