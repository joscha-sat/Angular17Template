import { Component, input } from '@angular/core';
import { TuiSelectModule } from '@taiga-ui/legacy';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiTextfieldOptionsDirective } from '@taiga-ui/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-base-string-select',
  imports: [
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldOptionsDirective,
    TranslatePipe,
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
}
