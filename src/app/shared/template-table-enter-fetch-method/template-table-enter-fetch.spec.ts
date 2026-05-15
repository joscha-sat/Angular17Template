import { signal, type Signal } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { type TableDataSource, TemplateTableEnterFetch } from './template-table-enter-fetch';

describe('TemplateTableEnterFetch', () => {
  let component: TemplateTableEnterFetch<any>;
  let fixture: ComponentFixture<TemplateTableEnterFetch<any>>;

  const createMockDataSource = (): TableDataSource<unknown> => {
    const entities: Signal<unknown[]> = signal<unknown[]>([]);
    const totalCount: Signal<number> = signal<number>(0);
    const loading: Signal<boolean> = signal<boolean>(false);

    return {
      entities,
      totalCount,
      loading,
      sendLoadRequest: (_parameters: unknown): void => {
        /* noop */
      },
    };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTableEnterFetch],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableEnterFetch<any>);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('tableDataSource', createMockDataSource());
    fixture.componentRef.setInput('columnHeaderLabels', ['Test Header 1', 'Test Header 2']);
    fixture.componentRef.setInput('displayedPropertyColumns', ['col1', 'col2']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
