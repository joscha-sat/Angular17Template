import { Component, Input, OnInit } from "@angular/core";
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { TuiLetModule } from "@taiga-ui/cdk";
import { NgForOf, NgIf } from "@angular/common";
import { TuiTagModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiFormatNumberPipeModule, TuiLinkModule } from "@taiga-ui/core";

@Component({
  selector: "app-base-table",
  standalone: true,
  imports: [
    TuiTableModule,
    TuiLetModule,
    NgForOf,
    TuiTagModule,
    TuiButtonModule,
    TuiLinkModule,
    NgIf,
    TuiFormatNumberPipeModule,
    TuiTablePaginationModule,
  ],
  templateUrl: "./base-table.component.html",
  styleUrl: "./base-table.component.scss",
})
export class BaseTableComponent<GenericT> implements OnInit {
  @Input({ required: true }) tableData: GenericT[] = [];
  @Input({ required: true }) headers: string[] = [];
  @Input({ required: true }) columns: string[] = [];

  total = this.tableData.length;
  page: number = 0;
  size: number = 10;
  sizedData: any[] = [];
  sortedColumn = this.columns[0];
  direction = "asc";

  ngOnInit(): void {
    this.loadPage();
  }

  onPage($event: TuiTablePagination) {
    this.size = $event.size;
    this.page = $event.page;

    this.loadPage();
  }

  loadPage() {
    const start = this.page * this.size;
    this.tableData = this.sortData(this.sortedColumn, this.direction);
    this.sizedData = this.tableData.slice(start, start + this.size);
  }

  sortData(column: any, direction: any): GenericT[] {
    return this.tableData.sort((a: any, b: any) => {
      let aColValue = a[column];
      let bColValue = b[column];

      console.log(aColValue);
      console.log(bColValue);

      if (!isNaN(Number(aColValue)) && !isNaN(Number(bColValue))) {
        aColValue = Number(aColValue);
        bColValue = Number(bColValue);
      }

      if (aColValue < bColValue) {
        return direction === "asc" ? -1 : 1;
      } else if (aColValue > bColValue) {
        return direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  onSortChange(column: string): void {
    this.sortedColumn = column;
    this.direction = this.direction === "asc" ? "desc" : "asc";
    this.loadPage();
  }

  extractNestedProperty(item: any, key: string): any {
    const keys = key.split(".");
    let value = item;

    for (const k of keys) {
      if (value && Object.prototype.hasOwnProperty.call(value, k)) {
        value = value[k];
      } else {
        return null;
      }
    }
    return value;
  }
}
