import { TemplateRef } from "@angular/core";
import { CustomTableCellDirective } from "../directives/custom-table-cell.directive";

export type CustomTableCell = {
  name: string;
  customTemplate?: TemplateRef<CustomTableCellDirective>;
}
