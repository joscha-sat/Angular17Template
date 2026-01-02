import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';

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
      imports: [TemplateDateSearchComponent, TranslateModule.forRoot()],
      providers: [provideNativeDateAdapter()],
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
