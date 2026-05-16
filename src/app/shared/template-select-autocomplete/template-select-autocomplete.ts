import {
  Component,
  input,
  type InputSignal,
  model,
  type ModelSignal,
  signal,
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
  imports: [FormsModule, AutoCompleteModule],
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
