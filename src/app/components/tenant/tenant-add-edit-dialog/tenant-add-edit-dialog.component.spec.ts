import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantAddEditDialogComponent } from './tenant-add-edit-dialog.component';
import { TenantService } from '../../../api/tenant.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('TenantAddEditDialogComponent', () => {
  let component: TenantAddEditDialogComponent;
  let fixture: ComponentFixture<TenantAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TenantAddEditDialogComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [TenantService, FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
