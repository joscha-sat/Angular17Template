import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { TemplateTableSearch } from './template-table-search';

describe('TemplateTableSearch', () => {
  let component: TemplateTableSearch;
  let fixture: ComponentFixture<TemplateTableSearch>;

  beforeEach(async () => {
    const mockService = {
      search: vi.fn().mockReturnValue(''),
    };

    await TestBed.configureTestingModule({
      imports: [TemplateTableSearch, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableSearch);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('service', mockService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
