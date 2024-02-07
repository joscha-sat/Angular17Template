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
    this.sizedData = this.tableData.slice(start, start + this.size);
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
