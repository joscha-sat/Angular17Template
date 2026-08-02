import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { Customer } from '../../../models/Customer';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { BaseTableComponent } from '../../../other/abstract-classes/BaseTable';
import { CustomerService } from '../../../api/customer.service';
import { DeleteIconComponent } from '../../../shared/icons/delete-icon/delete-icon.component';
import type { BaseGetQueryParams } from '../../../other/types/Table.type';

@Component({
  selector: 'app-customer-table',
  imports: [TemplateTableEnterFetchComponent, DeleteIconComponent],
  standalone: true,
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTableComponent
  extends BaseTableComponent<Customer>
  implements OnInit
{
  public readonly customerService: CustomerService = inject(CustomerService);

  readonly headers: WritableSignal<string[]> = signal<string[]>([
    'general.createdAt',
    'general.name',
    '',
  ]);

  readonly columns: WritableSignal<(keyof Customer | 'delete' | 'edit')[]> =
    signal<(keyof Customer | 'delete' | 'edit')[]>([
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

  openEditCustomerDialog(): void {
    //   todo
  }
}
