import { Component, inject } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseTuiButtonComponent } from '../../../shared/base-tui-button/base-tui-button.component';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { CustomerAddEditDialogComponent } from '../customer-add-edit-dialog/customer-add-edit-dialog.component';
import { BaseTableSearchComponent } from '../../../shared/base-table-search/base-table-search.component';
import { CustomerService } from '../../../api/customer.service';
import { BaseSearchComponent } from '../../../shared/base-search/base-search.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseDatePickerComponent } from '../../../shared/base-date-picker/base-date-picker.component';
import { TuiValueChangesModule } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
  selector: 'app-customers-header',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    TranslateModule,
    BaseTuiButtonComponent,
    BaseTableSearchComponent,
    BaseSearchComponent,
    BaseDatePickerComponent,
    TuiValueChangesModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './customers-header.component.html',
  styleUrl: './customers-header.component.scss',
})
export class CustomersHeaderComponent {
  dialogService = inject(TuiDialogHelperService);
  customerService = inject(CustomerService);
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    date: null,
  });

  openCreateCustomerDialog() {
    this.dialogService.openDialog(CustomerAddEditDialogComponent);
  }

  searchInCustomers($event: string) {
    this.customerService.search$.next($event);
  }
}
