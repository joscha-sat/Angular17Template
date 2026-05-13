import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TemplateInput } from './template-input';

// Test host component to wrap TemplateInput in a formGroup
@Component({
  template: `
    <form [formGroup]="testForm">
      <app-template-input fControlName="testControl"></app-template-input>
    </form>
  `,
  imports: [TemplateInput, ReactiveFormsModule],
})
class TestHostComponent {
  testForm = new FormGroup({
    testControl: new FormControl(''),
  });
}

describe('TemplateInput', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TemplateInput;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    // Get the nested TemplateInput
    component = fixture.debugElement.children[0].children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
