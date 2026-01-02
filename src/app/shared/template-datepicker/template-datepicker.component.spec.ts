import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';

import { TemplateDatepickerComponent } from './template-datepicker.component';

describe('TemplateDatepickerComponent', () => {
  let component: TemplateDatepickerComponent;
  let fixture: ComponentFixture<TemplateDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDatepickerComponent, TranslateModule.forRoot()],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
