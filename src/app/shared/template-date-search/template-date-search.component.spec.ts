import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { TemplateDateSearchComponent } from './template-date-search.component';

describe('TemplateDateSearchComponent', () => {
  let component: TemplateDateSearchComponent;
  let fixture: ComponentFixture<TemplateDateSearchComponent>;

  beforeEach(async () => {
    const mockService = {
      search: {
        set: vi.fn(),
      },
    };

    await TestBed.configureTestingModule({
      imports: [TemplateDateSearchComponent, getTranslocoModule()],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDateSearchComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('service', mockService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
