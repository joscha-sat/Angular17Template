import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestViewComponent } from './test-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateDatepickerComponent } from '../../shared/template-datepicker/template-datepicker.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('TestViewComponent', () => {
  let component: TestViewComponent;
  let fixture: ComponentFixture<TestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestViewComponent,
        ReactiveFormsModule,
        TemplateDatepickerComponent,
        ViewLayoutComponent,
        TranslateModule.forRoot(),
      ],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
