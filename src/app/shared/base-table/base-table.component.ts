import { Component, Input } from "@angular/core";
import { TuiTableModule, TuiTablePaginationModule } from "@taiga-ui/addon-table";
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
export class BaseTableComponent {
  @Input() tableData: any = [
    {
      name: "John Smith",
      age: 30,
      address: { street: "herbstraße" },
    },
  ];

  @Input() headers: string[] = ["Name", "Age", "address"];
  @Input() columns: string[] = ["name", "age", "address.street"];

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

    console.log(value);

    return value;
  }
}
