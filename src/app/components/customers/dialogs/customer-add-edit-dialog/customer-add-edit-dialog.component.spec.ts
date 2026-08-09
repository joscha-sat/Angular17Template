import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAddEditDialogComponent } from './customer-add-edit-dialog.component';
import { CustomerService } from '../../../../api/customer.service';
import { UtilityService } from '../../../../services/utility.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TemplateInputComponent } from '../../../../shared/template-input/template-input.component';
import { SaveButtonComponent } from '../../../../shared/buttons/save-btn/save-button.component';
import { CancelButtonComponent } from '../../../../shared/buttons/cancel-btn/cancel-button.component';
import { of } from 'rxjs';

describe('CustomerAddEditDialogComponent', () => {
  let component: CustomerAddEditDialogComponent;
  let fixture: ComponentFixture<CustomerAddEditDialogComponent>;

  beforeEach(async () => {
    const mockCustomerService = {
      createOneCustomer: vi.fn().mockReturnValue(of({})),
      updateCustomerById: vi.fn().mockReturnValue(of({})),
    };

    const mockMatDialog = {
      closeAll: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CustomerAddEditDialogComponent,
        ReactiveFormsModule,
        getTranslocoModule(),
        TemplateInputComponent,
        SaveButtonComponent,
        CancelButtonComponent,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
      ],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: UtilityService, useValue: {} },
        { provide: MatDialog, useValue: mockMatDialog },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
