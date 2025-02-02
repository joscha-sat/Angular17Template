import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-template-table',
  imports: [MatTableModule, MatPaginator],
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss',
})
export class TemplateTableComponent {
  headers = input.required<string[]>();
  displayedColumns = input.required<string[]>();
  tableData = input.required<any[]>();
}
