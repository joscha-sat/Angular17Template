import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { TuiSizeL } from '@taiga-ui/core';

export type RadioItem = {
  fControlName: string;
  ngxTitle: string;
  item: any;
  size?: TuiSizeL;
};

@Component({
  selector: 'app-base-radio-group',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TuiRadioLabeledModule,
  ],
  templateUrl: './base-radio-group.component.html',
  styleUrl: './base-radio-group.component.scss',
})
export class BaseRadioGroupComponent {
  radioItem = input.required<RadioItem>();
}
