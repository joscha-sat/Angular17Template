import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
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
import { FloatLabel } from 'primeng/floatlabel';

export type SelectValue = string | number | boolean;
export type SelectSizes = 'small' | 'large' | undefined;

export type SelectOptions = {
  name: string;
  value: SelectValue;
};

@Component({
  selector: 'app-template-select-autocomplete',
  imports: [FormsModule, AutoCompleteModule, NgTemplateOutlet, FloatLabel],
  templateUrl: './template-select-autocomplete.html',
  styleUrl: './template-select-autocomplete.scss',
})
export class TemplateSelectAutocomplete {
  // models
  readonly selectedValue: ModelSignal<SelectValue | SelectValue[] | undefined> = model();

  // inputs
  readonly options: InputSignal<Array<SelectOptions>> = input.required();
  readonly isDisplayedAsDropdown: InputSignal<boolean> = input(true);
  readonly multiple: InputSignal<boolean> = input(false);
  readonly size: InputSignal<SelectSizes> = input<SelectSizes>(undefined);
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined);
  readonly label: InputSignal<string | undefined> = input<string | undefined>(undefined);

  // signals
  readonly suggestedOptions: WritableSignal<Array<SelectOptions>> = signal([]);
  readonly ngModelValue: Signal<SelectValue | SelectValue[] | undefined> = computed(() => {
    if (this.multiple()) {
      const value: SelectValue | SelectValue[] | undefined = this.selectedValue();
      return Array.isArray(value) ? value : [];
    }
    return this.selectedValue();
  });

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

  onItemSelected(_event: { value: SelectOptions }): void {
    // Value is synced via ngModelChange and optionValue="value"
  }

  onNgModelChange(value: SelectValue | SelectValue[] | undefined): void {
    this.selectedValue.set(value);
  }

  onClear(): void {
    this.selectedValue.set(this.multiple() ? [] : undefined);
  }
}
