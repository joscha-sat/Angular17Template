import { Component, Inject, OnInit, signal } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/base-dialog/base-dialog.component';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../other/models/Customer';
import { BaseInputComponent } from '../../../shared/base-input/base-input.component';
import { BaseSaveCancelBtnsComponent } from '../../../shared/base-save-cancel-btns/base-save-cancel-btns.component';
import { TranslateModule } from '@ngx-translate/core';
import { TwoInputsRowLayoutComponent } from '../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout.component';
import { CustomerService } from '../../../api/customer.service';

@Component({
  selector: 'app-customer-add-edit-dialog',
  standalone: true,
  imports: [
    BaseInputComponent,
    BaseSaveCancelBtnsComponent,
    ReactiveFormsModule,
    TranslateModule,
    TwoInputsRowLayoutComponent,
  ],
  templateUrl: './customer-add-edit-dialog.component.html',
  styleUrl: './customer-add-edit-dialog.component.scss',
})
export class CustomerAddEditDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  model?: Customer;
  addCustomerMode = signal(true);
  form?: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) context: TuiDialogContext<any>,
    dialogService: TuiDialogHelperService,
    private fb: FormBuilder,
    private customerService: CustomerService,
  ) {
    super(context, dialogService);
  }

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
    this.addCustomerMode.set(true);

    if (!this.context.data) return;
    this.model = this.context.data;
    this.addCustomerMode.set(false);
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.model?.name, Validators.required],
    });
  }

  submit() {
    if (this.addCustomerMode()) {
      this.createCustomer();
    }
    this.updateCustomer();
  }

  createCustomer() {
    this.customerService
      .createOneCustomer(this.customerFromFormData)
      .subscribe(() => this.closeDialog());
  }

  updateCustomer() {
    if (!this.model) return;
    this.customerService
      .updateCustomerById(this.model?.id, this.customerFromFormData)
      .subscribe(() => this.closeDialog());
  }
}
