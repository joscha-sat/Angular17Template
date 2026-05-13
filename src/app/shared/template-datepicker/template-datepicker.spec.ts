import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { TemplateDatepicker } from './template-datepicker';

describe('TemplateDatepicker', () => {
  let component: TemplateDatepicker;
  let fixture: ComponentFixture<TemplateDatepicker>;

  beforeEach(async () => {
    const formGroup: FormGroup = new FormGroup({
      date: new FormControl(''),
    });
    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    TestBed.overrideComponent(TemplateDatepicker, {
      add: {
        viewProviders: [{ provide: ControlContainer, useValue: formGroupDirective }],
      },
    });

    await TestBed.configureTestingModule({
      imports: [TemplateDatepicker, getTranslocoModule(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
