import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  type InputSignal,
  model,
  type ModelSignal,
  signal,
  type Signal,
  TemplateRef,
  type WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

export type SelectOptions = {
  name: string;
  value: string | number | boolean;
};

@Component({
  selector: 'app-template-select-autocomplete',
  imports: [FormsModule, AutoCompleteModule, NgTemplateOutlet],
  templateUrl: './template-select-autocomplete.html',
  styleUrl: './template-select-autocomplete.scss',
})
export class TemplateSelectAutocomplete {
  // models
  readonly selectedValue: ModelSignal<string | number | boolean | undefined> = model<
    string | number | boolean | undefined
  >();

  // inputs
  readonly options: InputSignal<Array<SelectOptions>> = input.required();
  readonly isDisplayedAsDropdown: InputSignal<boolean> = input(true);

  // signals
  readonly suggestedOptions: WritableSignal<Array<SelectOptions>> = signal([]);

  // templates
  readonly itemTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild('item', { read: TemplateRef });
  readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild('header', { read: TemplateRef });
  readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild('footer', { read: TemplateRef });

  search(event: AutoCompleteCompleteEvent): void {
    const query: string = event.query.toLowerCase();
    this.suggestedOptions.set(
      this.options().filter((option: SelectOptions) => option.name.toLowerCase().includes(query)),
    );
  }

  onItemSelected(event: { value: SelectOptions }): void {
    this.selectedValue.set(event.value.value);
  }

  onClear(): void {
    this.selectedValue.set(undefined);
  }
}
