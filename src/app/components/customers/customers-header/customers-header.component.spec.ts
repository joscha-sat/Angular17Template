import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CustomersHeaderComponent } from './customers-header.component';

describe('CustomersHeaderComponent', () => {
  let component: CustomersHeaderComponent;
  let fixture: ComponentFixture<CustomersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersHeaderComponent, getTranslocoModule()],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
