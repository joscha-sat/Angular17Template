import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiValueChanges } from '@taiga-ui/cdk';
import { Component, inject, input, Input, output } from '@angular/core';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiSizeL,
  TuiSizeS,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type InputTypes = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiCurrencyPipe,
    TranslateModule,
    TuiValueChanges,
    TuiTextfieldComponent,
    TuiLabel,
    TuiTextfieldDirective,
    TuiPassword,
    TuiIcon,
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
  translateService = inject(TranslateService);
  type = input<InputTypes>('text');
  fControlName = input.required<string>();
  size = input<TuiSizeL | TuiSizeS>('m');

  valueChange = output<string>();

  // workaround to use the input type as default label value
  private _label?: string;

  get label(): string {
    return this._label ?? this.translateService.instant(`hint.${this.type()}`);
  }

  @Input()
  set label(value: string) {
    this._label = value;
  }

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
