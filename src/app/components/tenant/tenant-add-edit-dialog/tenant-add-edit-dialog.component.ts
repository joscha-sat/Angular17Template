import { Component, inject, OnInit } from '@angular/core';
import { MODE } from '../../../other/enums/mode.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tenant } from '../../../models/Tenant';
import { TenantService } from '../../../api/tenant.service';
import { AddEdit } from '../../../other/types/AddEdit.type';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tenant-add-edit-dialog',
  imports: [ReactiveFormsModule, TranslocoPipe],
  templateUrl: './tenant-add-edit-dialog.component.html',
  styleUrl: './tenant-add-edit-dialog.component.scss',
})
export class TenantAddEditDialogComponent implements OnInit, AddEdit {
  data: Tenant | undefined;
  mode: MODE = MODE.ADD;
  tenantForm?: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  tenantService: TenantService = inject(TenantService);
  protected readonly MODE: typeof MODE = MODE;

  ngOnInit(): void {
    this.getMode();
    this.initForm();
  }

  getMode(): void {}

  initForm(): void {
    this.tenantForm = this.fb.group({
      name: [this.data ?? '', Validators.required],
    });
  }

  createTenant(): void {
    this.tenantService
      .createOneTenant(new Tenant(this.tenantForm?.value))
      .subscribe();
  }

  updateTenant(): void {
    //   TODO
  }

  submit(): void {
    if (this.mode === MODE.ADD) {
      this.createTenant();
    } else {
      this.updateTenant();
    }
  }

  loadModelData(): void {
    //   TODO
  }
}
