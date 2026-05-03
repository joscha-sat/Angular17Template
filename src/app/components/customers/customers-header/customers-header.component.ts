import { Component, inject } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';
import { CustomerService } from '../../../api/customer.service';
import { TemplateDateSearchComponent } from '../../../shared/template-date-search/template-date-search.component';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customers-header',
  imports: [
    HeaderLayoutComponent,
    ReactiveFormsModule,
    Button,
    TemplateTableSearchComponent,
    TemplateDateSearchComponent,
    TranslocoPipe,
  ],
  templateUrl: './customers-header.component.html',
  styleUrl: './customers-header.component.scss',
})
export class CustomersHeaderComponent {
  // readonly dialog: Dialog = inject(Dialog);
  fb: FormBuilder = inject(FormBuilder);
  customerService: CustomerService = inject(CustomerService);
  visible: boolean = false;

  form: FormGroup = this.fb.group({
    date: null,
  });

  openCreateCustomerDialog(): void {
    this.visible = true;
  }
}
