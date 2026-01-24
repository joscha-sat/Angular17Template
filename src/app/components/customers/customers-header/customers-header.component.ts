import { Component, inject } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddEditDialogComponent } from '../dialogs/customer-add-edit-dialog/customer-add-edit-dialog.component';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';
import { CustomerService } from '../../../api/customer.service';
import { TemplateDateSearchComponent } from '../../../shared/template-date-search/template-date-search.component';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customers-header',
  imports: [
    HeaderLayoutComponent,
    ReactiveFormsModule,
    MatButton,
    TemplateTableSearchComponent,
    TemplateDateSearchComponent,
    TranslocoPipe,
  ],
  templateUrl: './customers-header.component.html',
  styleUrl: './customers-header.component.scss',
})
export class CustomersHeaderComponent {
  readonly dialog: MatDialog = inject(MatDialog);
  fb: FormBuilder = inject(FormBuilder);
  customerService: CustomerService = inject(CustomerService);

  form: FormGroup = this.fb.group({
    date: null,
  });

  openCreateCustomerDialog(): void {
    this.dialog.open(CustomerAddEditDialogComponent);
  }
}
