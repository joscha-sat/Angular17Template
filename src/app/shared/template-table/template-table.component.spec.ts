import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { PageEvent } from '@angular/material/paginator';

import { TemplateTableComponent } from './template-table.component';

describe('TemplateTableComponent', () => {
  let component: TemplateTableComponent<Record<string, unknown>>;
  let fixture: ComponentFixture<TemplateTableComponent<Record<string, unknown>>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableComponent<Record<string, unknown>>);
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

  it('should emit pagination changes from the paginator event', () => {
    const paginationChangeSpy = vi.spyOn(component.paginationChange, 'emit');
    const pageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 25,
      length: 100,
      previousPageIndex: 1,
    };

    component.handlePageEvent(pageEvent);

    expect(paginationChangeSpy).toHaveBeenCalledWith({ skip: 50, limit: 25 });
  });
});
