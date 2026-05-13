import { beforeEach, describe, expect, it } from 'vitest';
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

import { TemplateDateSearch } from './template-date-search';
import { TemplateDatepicker } from '../template-datepicker/template-datepicker';

describe('TemplateDateSearch', () => {
  let component: TemplateDateSearch;
  let fixture: ComponentFixture<TemplateDateSearch>;

  beforeEach(async () => {
    const mockService: { searchDate: WritableSignal<string> } = {
      searchDate: signal(''),
    };

    const formGroup: FormGroup = new FormGroup({
      date: new FormControl(''),
    });
    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    TestBed.overrideComponent(TemplateDateSearch, {
      add: {
        viewProviders: [{ provide: ControlContainer, useValue: formGroupDirective }],
      },
    });

    TestBed.overrideComponent(TemplateDatepicker, {
      add: {
        viewProviders: [{ provide: ControlContainer, useValue: formGroupDirective }],
      },
    });

    await TestBed.configureTestingModule({
      imports: [TemplateDateSearch, getTranslocoModule(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDateSearch);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('service', mockService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
