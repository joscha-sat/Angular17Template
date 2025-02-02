import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateTableComponent } from '../../shared/template-table/template-table.component';
import { CustomersStore } from '../../stores/customer.store';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import {
  BaseQueryParams,
  ResponseWithRecords,
} from '../../api/base-http-service/base-http.service';
import { Customer } from '../../other/models/Customer';

const DEFAULT_PAGINATION = { skip: 0, limit: 5 };
const COLUMN_CONFIG = {
  displayedColumns: ['name', 'createdAt', 'updatedAt'],
  headers: ['Name', 'Erstellt am', 'Aktualisiert am'],
};

@Component({
  selector: 'app-test-view',
  imports: [ReactiveFormsModule, TemplateTableComponent, ViewLayoutComponent],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss',
})
export class TestViewComponent implements OnInit {
  displayedColumns = signal(COLUMN_CONFIG.displayedColumns);
  header = signal(COLUMN_CONFIG.headers);
  totalItems = signal(0);
  customerStore = inject(CustomersStore);

  async ngOnInit(): Promise<void> {
    await this.loadCustomers({
      skip: DEFAULT_PAGINATION.skip,
      limit: DEFAULT_PAGINATION.limit,
    });
  }

  async onPaginationChange(event: {
    skip: number;
    limit: number;
  }): Promise<void> {
    await this.loadCustomers(event);
  }

  private async loadCustomers(payload: BaseQueryParams): Promise<void> {
    try {
      const response: ResponseWithRecords<Customer> =
        await this.customerStore.getAllCustomersPromise(payload);

      this.totalItems.set(response.total);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  }
}
