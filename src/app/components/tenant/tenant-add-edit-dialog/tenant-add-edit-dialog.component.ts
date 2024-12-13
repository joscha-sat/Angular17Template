import { Component, inject, OnInit } from '@angular/core';
import { MODE } from '../../../other/enums/mode.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Tenant } from '../../../other/models/Tenant';
import { TenantService } from '../../../api/tenant.service';
import { AddEdit } from '../../../other/types/AddEdit.type';

@Component({
  selector: 'app-tenant-add-edit-dialog',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './tenant-add-edit-dialog.component.html',
  styleUrl: './tenant-add-edit-dialog.component.scss',
})
export class TenantAddEditDialogComponent implements OnInit, AddEdit {
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

  getMode() {}

  initForm() {
    this.tenantForm = this.fb.group({
      name: [this.data ?? '', Validators.required],
    });
  }

  createTenant() {
    this.tenantService
      .createOneTenant(new Tenant(this.tenantForm?.value))
      .subscribe();
  }

  updateTenant() {
    //   TODO
  }

  submit() {
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
