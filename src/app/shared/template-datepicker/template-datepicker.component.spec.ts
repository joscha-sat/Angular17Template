import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { signal } from '@angular/core';

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

  it('should synchronize the optional service search date', () => {
    const searchDate = signal('');
    fixture.componentRef.setInput('service', { searchDate });
    fixture.detectChanges();

    component.selectedDateChanged('2026-08-02T00:00:00.000Z');

    expect(searchDate()).toBe('2026-08-02T00:00:00.000Z');
  });
});
