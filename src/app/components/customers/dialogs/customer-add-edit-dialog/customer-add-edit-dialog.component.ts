import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../../models/Customer';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../../../../api/customer.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TemplateInputComponent } from '../../../../shared/template-input/template-input.component';
import { SaveBtnComponent } from '../../../../shared/buttons/save-btn/save-btn.component';
import { CancelBtnComponent } from '../../../../shared/buttons/cancel-btn/cancel-btn.component';
import { UtilityService } from '../../../../services/utility.service';

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
export class CustomerAddEditDialogComponent implements OnInit {
  utilityService = inject(UtilityService);
  readonly dialog = inject(MatDialog);
  model?: Customer;
  form?: FormGroup;
  isCreateCustomerMode = signal(true);
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);

  get customerFromFormData(): Customer {
    // Reads form data and prepares a user object
    const formData = this.form?.value;
    return new Customer({
      name: formData.name,
    });
  }

  ngOnInit(): void {
    // this.loadModelData();
    this.initForm();
  }

  // Todo
  // loadModelData() {
  //   this.isCreateCustomerMode.set(true);
  //   this.isCreateCustomerMode.set(false);
  // }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.model?.name, Validators.required],
    });
  }

  submit(): void {
    if (this.isCreateCustomerMode()) {
      this.createCustomer();
    }
    this.updateCustomer();
  }

  createCustomer(): void {
    this.customerService
      .createOneCustomer(this.customerFromFormData)
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }

  updateCustomer(): void {
    if (!this.model) return;
    this.customerService
      .updateCustomerById(this.model?.id, this.customerFromFormData)
      .subscribe();
  }
}
