import { Component, input, InputSignal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-template-input',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputText,
    FloatLabel,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './template-input.component.html',
  styleUrl: './template-input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TemplateInputComponent {
  readonly label: InputSignal<string> = input('');
  readonly fControlName: InputSignal<string> = input.required<string>();
  readonly type: InputSignal<'text' | 'password'> = input<'text' | 'password'>('text');
  readonly iconClass: InputSignal<string> = input('');
}
