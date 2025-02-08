import { Component, inject } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddEditDialogComponent } from '../dialogs/customer-add-edit-dialog/customer-add-edit-dialog.component';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';
import { CustomersStore } from '../../../stores/customer.store';

@Component({
  selector: 'app-customers-header',
  imports: [
    HeaderLayoutComponent,
    TranslateModule,
    ReactiveFormsModule,
    MatButton,
    TemplateTableSearchComponent,
  ],
  templateUrl: './customers-header.component.html',
  styleUrl: './customers-header.component.scss',
})
export class CustomersHeaderComponent {
  readonly dialog = inject(MatDialog);
  fb = inject(FormBuilder);
  customerStore = inject(CustomersStore);

  form: FormGroup = this.fb.group({
    date: null,
  });

  openCreateCustomerDialog() {
    this.dialog.open(CustomerAddEditDialogComponent);
  }
}
