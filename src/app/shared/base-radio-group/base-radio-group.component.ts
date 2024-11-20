import { TuiRadio } from '@taiga-ui/kit';
import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiLabel, TuiSizeS } from '@taiga-ui/core';

export type RadioItem = {
  fControlName: string;
  ngxTitle: string;
  item: any;
  size?: TuiSizeS;
};

@Component({
  selector: 'app-base-radio-group',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TuiLabel,
    TuiRadio,
  ],
  templateUrl: './base-radio-group.component.html',
  styleUrl: './base-radio-group.component.scss',
})
export class BaseRadioGroupComponent {
  radioItem = input.required<RadioItem>();
}
