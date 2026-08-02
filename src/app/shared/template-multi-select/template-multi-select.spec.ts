import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TemplateMultiSelect } from './template-multi-select';

describe('TemplateMultiSelect Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MultiSelectModule],
      declarations: [TemplateMultiSelect],
    });
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TemplateMultiSelect);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have required options input', () => {
    const fixture = TestBed.createComponent(TemplateMultiSelect);
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should display selected values in the model', () => {
    const fixture = TestBed.createComponent(TemplateMultiSelect);
    fixture.componentInstance.options.set([
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]);
    fixture.componentInstance.selectedValues.set(['option1']);
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedValues()).toEqual(['option1']);
  });

  it('should handle clear action', () => {
    const fixture = TestBed.createComponent(TemplateMultiSelect);
    fixture.componentInstance.options.set([
      { label: 'Option 1', value: 'option1' },
    ]);
    fixture.componentInstance.selectedValues.set(['option1']);
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedValues()).toEqual(['option1']);

    fixture.componentInstance.onClear();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedValues()).toEqual([]);
  });
});
