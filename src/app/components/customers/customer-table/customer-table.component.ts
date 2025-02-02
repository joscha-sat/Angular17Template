import { Component, inject, OnInit, signal } from '@angular/core';
import { TemplateTableComponent } from '../../../shared/template-table/template-table.component';
import { CustomersStore } from '../../../stores/customer.store';
import {
  BaseQueryParams,
  ResponseWithRecords,
} from '../../../api/base-http-service/base-http.service';
import { Customer } from '../../../other/models/Customer';
import { DeleteIconComponent } from '../../../shared/icons/delete-icon/delete-icon.component';
import { EditIconComponent } from '../../../shared/icons/edit-icon/edit-icon.component';

const DEFAULT_PAGINATION = { skip: 0, limit: 10 };
const COLUMN_CONFIG = {
  displayedColumns: ['name', 'createdAt', 'updatedAt', 'actions'],
  headers: ['Name', 'Erstellt am', 'Aktualisiert am', ''],
};

@Component({
  selector: 'app-customer-table',
  imports: [TemplateTableComponent, DeleteIconComponent, EditIconComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent implements OnInit {
  displayedColumns = signal(COLUMN_CONFIG.displayedColumns);
  header = signal(COLUMN_CONFIG.headers);
  totalItems = signal(0);
  customerStore = inject(CustomersStore);

  skip = signal(DEFAULT_PAGINATION.skip);
  limit = signal(DEFAULT_PAGINATION.limit);

  async ngOnInit(): Promise<void> {
    await this.loadCustomers();
  }

  async onPaginationChange(event: BaseQueryParams): Promise<void> {
    this.skip.set(event.skip ?? 0);
    this.limit.set(event.limit ?? 0);

    await this.loadCustomers();
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.customerStore.deleteCustomerByIdPromise(id);
      await this.loadCustomers();
    } catch (error) {
      console.error(`Failed to delete customer with ID ${id}:`, error);
    }
  }

  editCustomer(customer: any) {
    console.log('edit');
  }

  private async loadCustomers(): Promise<void> {
    try {
      const response: ResponseWithRecords<Customer> =
        await this.customerStore.getAllCustomersPromise({
          skip: this.skip(),
          limit: this.limit(),
        });

      this.totalItems.set(response.total);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  }
}
