import { TuiRadio } from '@taiga-ui/kit';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiHorizontalDirection,
  TuiLabel,
  TuiSizeL,
  TuiSizeS,
} from '@taiga-ui/core';

export type RadioItem = {
  name: string;
};

@Component({
  selector: 'app-base-radio-block',
  imports: [TuiRadio, ReactiveFormsModule, TuiLabel],
  templateUrl: './base-radio-block.component.html',
  styleUrl: './base-radio-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseRadioBlockComponent {
  radioItems = input.required<RadioItem[]>();
  fControlName = input.required<string>();
  size = input<TuiSizeL | TuiSizeS>('m');
  contentAlign = input<TuiHorizontalDirection>('right');
}
