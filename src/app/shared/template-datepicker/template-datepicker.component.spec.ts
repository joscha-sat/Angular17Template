import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { provideNativeDateAdapter } from '@angular/material/core';

import { TemplateDatepickerComponent } from './template-datepicker.component';

describe('TemplateDatepickerComponent', () => {
  let component: TemplateDatepickerComponent;
  let fixture: ComponentFixture<TemplateDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDatepickerComponent, getTranslocoModule()],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
