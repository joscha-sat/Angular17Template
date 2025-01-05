import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateTableComponent } from '../../shared/template-table/template-table.component';
import { CustomersStore } from '../../stores/customer.store';

@Component({
  selector: 'app-test-view',
  imports: [ReactiveFormsModule, TemplateTableComponent],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss',
})
export class TestViewComponent implements OnInit {
  customerStore = inject(CustomersStore);

  displayedColumns = signal(['name', 'createdAt', 'updatedAt']);
  header = signal(['Name', 'Erstellt am', 'Aktualisiert am']);

  async ngOnInit() {
    await this.customerStore.getAllCustomersPromise();
  }
}
