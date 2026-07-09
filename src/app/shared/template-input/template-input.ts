import { Component, input, InputSignal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-template-input',
  imports: [IconFieldModule, InputIconModule, InputText, FloatLabel, ReactiveFormsModule, FormField, TranslocoPipe],
  templateUrl: './template-input.html',
  styleUrl: './template-input.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TemplateInput {
  readonly label: InputSignal<string> = input('');
  readonly fControlName: InputSignal<string> = input('');
  readonly field: InputSignal<FieldTree<string> | undefined> = input<FieldTree<string> | undefined>(undefined);
  readonly type: InputSignal<'text' | 'password'> = input<'text' | 'password'>('text');
  readonly iconClass: InputSignal<string> = input('');
}
