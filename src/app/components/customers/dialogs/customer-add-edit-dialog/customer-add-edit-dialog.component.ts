import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../../models/Customer';
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

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customer-add-edit-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    TemplateInputComponent,
    MatDialogActions,
    MatDialogClose,
    SaveBtnComponent,
    CancelBtnComponent,
    TranslocoPipe,
  ],
  templateUrl: './customer-add-edit-dialog.component.html',
  styleUrl: './customer-add-edit-dialog.component.scss',
})
export class CustomerAddEditDialogComponent implements OnInit {
  utilityService: UtilityService = inject(UtilityService);
  readonly dialog: MatDialog = inject(MatDialog);
  model?: Customer;
  form?: FormGroup;
  readonly isCreateCustomerMode: WritableSignal<boolean> = signal(true);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly customerService: CustomerService = inject(CustomerService);

  get customerFromFormData(): Customer {
    // Reads form data and prepares a user object
    const formData: { name?: string } = this.form?.value as { name?: string };
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
    if (!this.model) {
      return;
    }
    this.customerService
      .updateCustomerById(this.model.id, this.customerFromFormData)
      .subscribe();
  }
}
