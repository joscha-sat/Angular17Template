import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[customTableCell]',
  standalone: true
})
export class CustomTableCellDirective {
  @Input() rowData: any;
}
