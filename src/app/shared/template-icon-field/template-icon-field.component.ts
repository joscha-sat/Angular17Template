import { Component, input, InputSignal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-template-icon-field',
  imports: [IconFieldModule, InputIconModule, InputText],
  templateUrl: './template-icon-field.component.html',
  styleUrl: './template-icon-field.component.scss',
})
export class TemplateIconFieldComponent {
  readonly iconClass: InputSignal<string> = input.required<string>();
  readonly placeholder: InputSignal<string> = input('');
}
