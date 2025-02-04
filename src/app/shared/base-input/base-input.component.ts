import { Component, Input } from '@angular/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiErrorModule,
  TuiSizeL,
  TuiSizeS,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TranslateModule } from '@ngx-translate/core';

type InputTypes = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiInputPasswordModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiCurrencyPipeModule,
    TranslateModule,
  ],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseInputComponent {
  @Input({ required: true }) type: InputTypes = 'text';
  @Input({ required: true }) fControlName: string = '';
  @Input() size: TuiSizeL | TuiSizeS = 'm';
  // workaround to use the input type as default label value
  private _label?: string;

  get label(): string {
    return this._label || `enter a ${this.type}`;
  }

  @Input()
  set label(value: string) {
    this._label = value;
  }
}
