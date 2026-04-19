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
import { Dialog } from 'primeng/dialog';
import { TemplateInputComponent } from '../../../../shared/template-input/template-input.component';
import { SaveBtnComponent } from '../../../../shared/buttons/save-btn/save-btn.component';
import { CancelBtnComponent } from '../../../../shared/buttons/cancel-btn/cancel-btn.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customer-add-edit-dialog',
  imports: [
    ReactiveFormsModule,
    Dialog,
    TemplateInputComponent,
    SaveBtnComponent,
    CancelBtnComponent,
    TranslocoPipe,
  ],
  templateUrl: './customer-add-edit-dialog.component.html',
  styleUrl: './customer-add-edit-dialog.component.scss',
})
export class CustomerAddEditDialogComponent implements OnInit {
  model?: Customer;
  form?: FormGroup;
  readonly isCreateCustomerMode: WritableSignal<boolean> = signal(true);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly customerService: CustomerService = inject(CustomerService);

  visible: boolean = true;

  get customerFromFormData(): Customer {
    const formData: { name?: string } = this.form?.value as { name?: string };
    return new Customer({ name: formData.name });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.model?.name, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  submit(): void {
    if (this.isCreateCustomerMode()) {
      this.createCustomer();
    } else {
      this.updateCustomer();
    }
  }

  createCustomer(): void {
    this.customerService
      .createOneCustomer(this.customerFromFormData)
      .subscribe(() => {
        this.closeDialog();
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

  closeDialog(): void {
    this.visible = false;
  }
}
