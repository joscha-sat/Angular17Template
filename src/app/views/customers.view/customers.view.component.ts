import { Component } from '@angular/core';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { CustomersHeaderComponent } from '../../components/customers/customers-header/customers-header.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers.view',
  imports: [ViewLayoutComponent, CustomersHeaderComponent, ReactiveFormsModule],
  templateUrl: './customers.view.component.html',
  styleUrl: './customers.view.component.scss',
})
export class CustomersViewComponent {}
