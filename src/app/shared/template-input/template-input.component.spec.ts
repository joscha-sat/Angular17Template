import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TemplateInputComponent } from './template-input.component';

// Test host component to wrap TemplateInputComponent in a formGroup
@Component({
  template: `
    <form [formGroup]="testForm">
      <app-template-input fControlName="testControl"></app-template-input>
    </form>
  `,
  imports: [TemplateInputComponent, ReactiveFormsModule],
})
class TestHostComponent {
  testForm = new FormGroup({
    testControl: new FormControl(''),
  });
}

describe('TemplateInputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TemplateInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    // Get the nested TemplateInputComponent
    component = fixture.debugElement.children[0].children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
