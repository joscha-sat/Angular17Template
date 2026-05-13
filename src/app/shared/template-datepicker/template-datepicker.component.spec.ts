import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { TemplateDatepickerComponent } from './template-datepicker.component';

describe('TemplateDatepickerComponent', () => {
  let component: TemplateDatepickerComponent;
  let fixture: ComponentFixture<TemplateDatepickerComponent>;

  beforeEach(async () => {
    const formGroup: FormGroup = new FormGroup({
      date: new FormControl(''),
    });
    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    TestBed.overrideComponent(TemplateDatepickerComponent, {
      add: {
        viewProviders: [{ provide: ControlContainer, useValue: formGroupDirective }],
      },
    });

    await TestBed.configureTestingModule({
      imports: [TemplateDatepickerComponent, getTranslocoModule(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
