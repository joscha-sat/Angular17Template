import { Component, inject, OnInit } from '@angular/core';
import { MODE } from '../../../other/enums/mode.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tenant } from '../../../models/Tenant';
import { TenantService } from '../../../api/tenant.service';
import { AddEdit } from '../../../other/types/AddEdit.type';
import { TranslocoPipe } from '@jsverse/transloco';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TemplateInput } from '../../../shared/template-input/template-input';
import { SaveBtn } from '../../../shared/buttons/save-btn/save-btn';
import { CancelBtn } from '../../../shared/buttons/cancel-btn/cancel-btn';

@Component({
  selector: 'app-tenant-add-edit-dialog',
  imports: [ReactiveFormsModule, TranslocoPipe, TemplateInput, SaveBtn, CancelBtn],
  templateUrl: './tenant-add-edit-dialog.html',
  styleUrl: './tenant-add-edit-dialog.scss',
})
export class TenantAddEditDialog implements OnInit, AddEdit {
  data: Tenant | undefined;
  mode: MODE = MODE.ADD;
  tenantForm?: FormGroup;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly tenantService: TenantService = inject(TenantService);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig<{
    mode?: MODE;
    tenant?: Tenant;
  }> = inject(DynamicDialogConfig) as DynamicDialogConfig<{
    mode?: MODE;
    tenant?: Tenant;
  }>;
  protected readonly MODE: typeof MODE = MODE;

  ngOnInit(): void {
    this.getMode();
    this.initForm();
  }

  getMode(): void {
    if (this.config.data?.mode) {
      this.mode = this.config.data.mode;
    }
    if (this.config.data?.tenant) {
      this.data = this.config.data.tenant;
    }
  }

  initForm(): void {
    this.tenantForm = this.fb.group({
      name: [this.data?.name ?? '', Validators.required],
    });
  }

  createTenant(): void {
    this.tenantService.createOneTenant(new Tenant(this.tenantForm?.value)).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  updateTenant(): void {
    if (!this.data) {
      return;
    }
    this.tenantService.updateTenantById(this.data.id, new Tenant(this.tenantForm?.value)).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  submit(): void {
    if (this.tenantForm?.invalid) {
      return;
    }

    if (this.mode === MODE.ADD) {
      this.createTenant();
    } else {
      this.updateTenant();
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  loadModelData(): void {
    // Intentionally empty or handle loading logic if required
  }
}
