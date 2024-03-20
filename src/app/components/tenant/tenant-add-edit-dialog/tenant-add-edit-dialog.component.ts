import { Component, inject, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/base-dialog/base-dialog.component';
import { MODE } from '../../../other/enums/mode.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BaseInputComponent } from '../../../shared/base-input/base-input.component';
import { BaseSaveCancelBtnsComponent } from '../../../shared/base-save-cancel-btns/base-save-cancel-btns.component';
import { Tenant } from '../../../other/models/Tenant';
import { TenantService } from '../../../api/tenant.service';

@Component({
  selector: 'app-tenant-add-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    BaseInputComponent,
    BaseSaveCancelBtnsComponent,
  ],
  templateUrl: './tenant-add-edit-dialog.component.html',
  styleUrl: './tenant-add-edit-dialog.component.scss',
})
export class TenantAddEditDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  data: Tenant | undefined;
  mode = MODE.ADD;
  tenantForm?: FormGroup;
  fb = inject(FormBuilder);
  tenantService = inject(TenantService);
  protected readonly MODE = MODE;

  ngOnInit(): void {
    this.getMode();
    this.initForm();
  }

  getMode() {
    if (this.context.data) {
      this.data = this.context.data;
      this.mode = MODE.EDIT;
    } else {
      this.mode = MODE.ADD;
    }
  }

  initForm() {
    this.tenantForm = this.fb.group({
      name: [this.data ?? '', Validators.required],
    });
  }

  addTenant() {
    this.tenantService
      .createTenant(new Tenant(this.tenantForm?.value))
      .subscribe(() => this.closeDialog());
  }

  updateTenant() {
    //   TODO
  }

  submit() {
    if (this.mode === MODE.ADD) {
      this.addTenant();
    } else {
      this.updateTenant();
    }
  }
}
