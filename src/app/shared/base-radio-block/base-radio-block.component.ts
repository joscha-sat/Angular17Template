import { TuiBlock, TuiRadio } from '@taiga-ui/kit';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiGroup,
  TuiHorizontalDirection,
  TuiSizeL,
  TuiSizeXS,
} from '@taiga-ui/core';

export type RadioItem = {
  name: string;
};

@Component({
  selector: 'app-base-radio-block',
  standalone: true,
  imports: [TuiBlock, TuiRadio, ReactiveFormsModule, TuiGroup],
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
  size = input<TuiSizeL | TuiSizeXS>('m');
  contentAlign = input<TuiHorizontalDirection>('right');
}
