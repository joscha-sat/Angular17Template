import { Component, input } from '@angular/core';
import {
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiSizeL,
  TuiSizeS,
  TuiTextfieldOptionsDirective,
} from '@taiga-ui/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-base-string-select',
  imports: [
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldOptionsDirective,
    TranslatePipe,
    TuiTextfieldControllerModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './base-string-select.component.html',
  styleUrl: './base-string-select.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseStringSelectComponent {
  label = input.required<string>();
  selectItemArray = input.required<any[]>();
  fControlName = input.required<string>();
  size = input<TuiSizeL | TuiSizeS>('m');
}
