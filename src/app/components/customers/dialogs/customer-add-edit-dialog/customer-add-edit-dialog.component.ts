import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../../other/models/Customer';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../../../../api/customer.service';
import { AddEdit } from '../../../../other/types/AddEdit.type';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TemplateInputComponent } from '../../../../shared/template-input/template-input.component';
import { SaveBtnComponent } from '../../../../shared/buttons/save-btn/save-btn.component';
import { CancelBtnComponent } from '../../../../shared/buttons/cancel-btn/cancel-btn.component';

@Component({
  selector: 'app-customer-add-edit-dialog',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatDialogTitle,
    MatDialogContent,
    TemplateInputComponent,
    MatDialogActions,
    MatDialogClose,
    SaveBtnComponent,
    CancelBtnComponent,
  ],
  templateUrl: './customer-add-edit-dialog.component.html',
  styleUrl: './customer-add-edit-dialog.component.scss',
})
export class CustomerAddEditDialogComponent implements OnInit, AddEdit {
  model?: Customer;
  form?: FormGroup;

  isCreateCustomerMode = signal(true);

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
  ) {}

  get customerFromFormData(): Customer {
    // Reads form data and prepares a user object
    const formData = this.form?.value;
    return new Customer({
      name: formData.name,
    });
  }

  ngOnInit(): void {
    this.loadModelData();
    this.initForm();
  }

  loadModelData() {
    this.isCreateCustomerMode.set(true);
    this.isCreateCustomerMode.set(false);
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.model?.name, Validators.required],
    });
  }

  submit() {
    if (this.isCreateCustomerMode()) {
      this.createCustomer();
    }
    this.updateCustomer();
  }

  createCustomer() {
    this.customerService
      .createOneCustomer(this.customerFromFormData)
      .subscribe();
  }

  updateCustomer() {
    if (!this.model) return;
    this.customerService
      .updateCustomerById(this.model?.id, this.customerFromFormData)
      .subscribe();
  }
}
