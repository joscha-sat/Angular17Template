import { Component, inject } from '@angular/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../../../api/customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers-header',
  imports: [HeaderLayoutComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './customers-header.component.html',
  styleUrl: './customers-header.component.scss',
})
export class CustomersHeaderComponent {
  customerService = inject(CustomerService);
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    date: null,
  });

  openCreateCustomerDialog() {}
}
