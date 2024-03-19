import { Injectable } from "@angular/core";
import { PaginationEvent, TableFilterEvent, TableSortEvent } from "../other/types/Pagination.type";

@Injectable({
  providedIn: "root",
})
/**
 * abstract service class to be extended by services that need pagination and filtering
 * used mainly to set variables for the pagination and filtering that are used for the api calls
 */
export abstract class PaginationFilterService {
  totalAmount: number = 0;
  filter: TableFilterEvent = { searchTerm: "", tabIndex: 0 };
  sort!: string;

  private _startIndex: number | undefined = undefined;

  get startIndex(): string {
    if (this._startIndex !== undefined) {
      return this._startIndex.toString();
    }
    return "";
  }

  private _endIndex: number | undefined = undefined;

  get endIndex(): string {
    if (this._endIndex !== undefined) {
      return this._endIndex.toString();
    }
    return "";
  }

  public setPaginationIndices(paginatorIndex: PaginationEvent) {
    this._startIndex = paginatorIndex.start;
    this._endIndex = paginatorIndex.limit;
  }

  public setFilter(filterEvent: TableFilterEvent) {
    this.filter = filterEvent;
  }

  public setSorting(sortingEvent: TableSortEvent) {
    if (sortingEvent.sortDirection === 1) {
      this.sort = `${ sortingEvent.sortColumn }+ASC`;
    } else {
      this.sort = `${ sortingEvent.sortColumn }+DESC`;
    }
  }

  public getAmount(): number {
    return this.totalAmount;
  }
}
