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
export class BaseTableComponent implements OnInit {

  @Input() tableData: any = [
    {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    }, {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    },
  ];

  @Input() headers: string[] = ["Name", "Age", "address"];
  @Input() columns: string[] = ["name", "age", "address.street"];
  total = this.tableData.length;

  page: number = 0;
  size: number = 10;
  sizedData = [];


  ngOnInit(): void {
    this.loadPage();
  }

  extractNestedProperty(item: any, key: string): any {
    const keys = key.split(".");
    let value = item;

    for (const k of keys) {
      if (value && value.hasOwnProperty(k)) {
        value = value[k];
      } else {
        return null;
      }
    }
    return value;
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
}
