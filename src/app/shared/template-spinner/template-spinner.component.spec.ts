import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSpinnerComponent } from './template-spinner.component';

describe('TemplateSpinnerComponent', () => {
  let component: TemplateSpinnerComponent;
  let fixture: ComponentFixture<TemplateSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
