import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { TuiLetModule } from "@taiga-ui/cdk";
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from "@angular/common";
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
    NgSwitch,
    NgTemplateOutlet,
    NgSwitchCase,
    NgSwitchDefault,
  ],
  templateUrl: "./base-table.component.html",
  styleUrl: "./base-table.component.scss",
})
export class BaseTableComponent<GenericT> implements OnInit {
  @Input() tableData: GenericT[] = [];
  @Input() headers: string[] = [];
  @Input() columns: string[] = [];
  
  @Input() customHeaders: string[] | undefined;
  @Input() customColumns: string[] | undefined;
  @Input() cellTemplates: TemplateRef<any>[] | undefined;

  @Output() rowClickEvent = new EventEmitter();

  total = 0;
  page: number = 0;
  size: number = 10;
  sizedData: GenericT[] = [];
  sortedColumn = this.columns[0];
  direction = "asc";

  get allColumns() {
    if (this.customColumns) {
      return [...this.columns, ...this.customColumns!];
    }
    return [...this.columns]
  }

  get allHeaders() {
    if (this.customHeaders) {
      return [...this.headers, ...this.customHeaders];
    }
    return [...this.headers]
  }

  ngOnInit(): void {
    this.columns = this.allColumns;
    this.loadPage();
  }

  onPage($event: TuiTablePagination) {
    this.size = $event.size;
    this.page = $event.page;

    this.loadPage();
  }

  loadPage() {
    this.total = this.tableData.length;
    const start = this.page * this.size;
    this.tableData = this.sortData(this.sortedColumn, this.direction);
    this.sizedData = this.tableData.slice(start, start + this.size);
  }

  sortData(column: any, direction: any): any[] {
    return this.tableData.sort((a: any, b: any) => {
      let aColValue = a[column];
      let bColValue = b[column];

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
