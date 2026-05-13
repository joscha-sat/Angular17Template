import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantAddEditDialog } from './tenant-add-edit-dialog';
import { TenantService } from '../../../api/tenant.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('TenantAddEditDialog', () => {
  let component: TenantAddEditDialog;
  let fixture: ComponentFixture<TenantAddEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantAddEditDialog, ReactiveFormsModule, getTranslocoModule()],
      providers: [
        TenantService,
        FormBuilder,
        MessageService,
        DynamicDialogRef,
        DynamicDialogConfig,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantAddEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
