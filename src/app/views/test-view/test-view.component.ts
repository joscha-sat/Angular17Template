import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateDatepickerComponent } from '../../shared/template-datepicker/template-datepicker.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';

@Component({
  selector: 'app-test-view',
  imports: [
    ReactiveFormsModule,
    TemplateDatepickerComponent,
    ViewLayoutComponent,
  ],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss',
})
export class TestViewComponent {}
