import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Customer } from '../../../models/Customer';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { BaseTableComponent } from '../../../other/abstract-classes/refreshBaseTable';
import { CustomerService } from '../../../api/customer.service';
import { DeleteIconComponent } from '../../../shared/icons/delete-icon/delete-icon.component';
import { BaseGetQueryParams } from '../../../other/types/Table.type';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [TemplateTableEnterFetchComponent, DeleteIconComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTableComponent
  extends BaseTableComponent<Customer>
  implements OnInit
{
  public readonly customerService = inject(CustomerService);

  headers = signal<string[]>(['general.createdAt', 'general.name', '']);

  columns = signal<(keyof Customer | 'delete' | 'edit')[]>([
    'createdAt',
    'name',
    'delete',
  ]);

  override ngOnInit(): void {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomerById(id).subscribe();
  }

  setTableRefreshService(): CustomerService {
    return this.customerService;
  }

  setTableRefreshMethodName(): string {
    return 'getAllCustomers';
  }

  override setCustomParams(): Partial<BaseGetQueryParams> {
    return { sort: 'createdAt,DESC' };
  }

  openEditCustomerDialog(customer: Customer): void {
    console.log(customer);
  }
}
