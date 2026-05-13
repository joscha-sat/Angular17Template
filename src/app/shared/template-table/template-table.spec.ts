import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTableComponent } from './template-table';

describe('TemplateTableComponent', () => {
  let component: TemplateTableComponent<any>;
  let fixture: ComponentFixture<TemplateTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableComponent<any>);
    component = fixture.componentInstance;

    // Set required inputs using setInput
    fixture.componentRef.setInput('headers', ['Test Header 1', 'Test Header 2']);
    fixture.componentRef.setInput('displayedColumns', ['col1', 'col2']);
    fixture.componentRef.setInput('tableData', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
