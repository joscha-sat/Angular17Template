import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersViewComponent } from './customers.view.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { CustomersHeaderComponent } from '../../components/customers/customers-header/customers-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerTableComponent } from '../../components/customers/customer-table/customer-table.component';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('CustomersViewComponent', () => {
  let component: CustomersViewComponent;
  let fixture: ComponentFixture<CustomersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomersViewComponent,
        ViewLayoutComponent,
        CustomersHeaderComponent,
        ReactiveFormsModule,
        CustomerTableComponent,
        getTranslocoModule(),
      ],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
