import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { TemplateDateSearchComponent } from './template-date-search';
import { TemplateDatepickerComponent } from '../template-datepicker/template-datepicker';

describe('TemplateDateSearchComponent', () => {
  let component: TemplateDateSearchComponent;
  let fixture: ComponentFixture<TemplateDateSearchComponent>;

  beforeEach(async () => {
    const mockService: { searchDate: WritableSignal<string> } = {
      searchDate: signal(''),
    };

    const formGroup: FormGroup = new FormGroup({
      date: new FormControl(''),
    });
    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    TestBed.overrideComponent(TemplateDateSearchComponent, {
      add: {
        viewProviders: [{ provide: ControlContainer, useValue: formGroupDirective }],
      },
    });

    TestBed.overrideComponent(TemplateDatepickerComponent, {
      add: {
        viewProviders: [{ provide: ControlContainer, useValue: formGroupDirective }],
      },
    });

    await TestBed.configureTestingModule({
      imports: [TemplateDateSearchComponent, getTranslocoModule(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDateSearchComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('service', mockService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
