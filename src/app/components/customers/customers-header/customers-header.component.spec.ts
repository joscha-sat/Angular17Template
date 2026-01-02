import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CustomersHeaderComponent } from './customers-header.component';

describe('CustomersHeaderComponent', () => {
  let component: CustomersHeaderComponent;
  let fixture: ComponentFixture<CustomersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersHeaderComponent, TranslateModule.forRoot()],
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
