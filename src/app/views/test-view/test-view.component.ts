import { Component } from '@angular/core';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { BaseInputComponent } from '../../shared/base-input/base-input.component';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { BaseTabsComponent } from '../../shared/base-tabs/base-tabs.component';

@Component({
  selector: 'app-test-view',
  standalone: true,
  imports: [
    ViewLayoutComponent,
    BaseInputComponent,
    ReactiveFormsModule,
    BaseTabsComponent,
  ],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TestViewComponent {
  form?: FormGroup = new FormGroup({ name: new FormControl() });
}
