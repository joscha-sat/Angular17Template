import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSpinner } from './template-spinner';

describe('TemplateSpinner', () => {
  let component: TemplateSpinner;
  let fixture: ComponentFixture<TemplateSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
