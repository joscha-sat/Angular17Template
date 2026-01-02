import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TemplateTableSearchComponent } from './template-table-search.component';

describe('TemplateTableSearchComponent', () => {
  let component: TemplateTableSearchComponent;
  let fixture: ComponentFixture<TemplateTableSearchComponent>;

  beforeEach(async () => {
    const mockService = {
      search: vi.fn().mockReturnValue(''),
    };

    await TestBed.configureTestingModule({
      imports: [TemplateTableSearchComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableSearchComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('service', mockService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
