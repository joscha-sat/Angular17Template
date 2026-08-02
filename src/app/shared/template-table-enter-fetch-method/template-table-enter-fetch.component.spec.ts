import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TemplateTableEnterFetchComponent } from './template-table-enter-fetch.component';

describe('TemplateTableEnterFetchComponent', () => {
  let component: TemplateTableEnterFetchComponent<any>;
  let fixture: ComponentFixture<TemplateTableEnterFetchComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTableEnterFetchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableEnterFetchComponent<any>);
    component = fixture.componentInstance;

    // Set required inputs
    const mockFetchData = vi.fn().mockReturnValue(
      of({
        data: [],
        total: 0,
        skip: 0,
        limit: 10,
      }),
    );

    fixture.componentRef.setInput('fetchData', mockFetchData);
    fixture.componentRef.setInput('headers', [
      'Test Header 1',
      'Test Header 2',
    ]);
    fixture.componentRef.setInput('displayedColumns', ['col1', 'col2']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
