import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTable } from './template-table';

describe('TemplateTable', () => {
  let component: TemplateTable<any>;
  let fixture: ComponentFixture<TemplateTable<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTable],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTable<any>);
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
