import {
  Component,
  inject,
  input,
  type InputSignal,
  type OnInit,
  type WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TemplateInputComponent } from '../template-input/template-input.component';

type SearchableService = {
  search: WritableSignal<string>;
};

@Component({
  selector: 'app-template-table-search',
  imports: [ReactiveFormsModule, TemplateInputComponent],
  templateUrl: './template-table-search.component.html',
  styleUrl: './template-table-search.component.scss',
})
export class TemplateTableSearchComponent implements OnInit {
  readonly service: InputSignal<SearchableService> =
    input.required<SearchableService>();
  searchForm: FormGroup;
  private readonly fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.searchForm = this.createSearchForm();
  }

  ngOnInit(): void {
    this.syncSearchValueFromService();
  }

  // Updates the form value when the search input changes
  onSearchChange(event: Event): void {
    const inputValue: string = this.getInputValueFromEvent(event);
    this.updateServiceSearchValue(inputValue);
  }

  // Creates the search form with initial empty value
  private createSearchForm(): FormGroup {
    return this.fb.group({
      search: [null],
    });
  }

  // Synchronizes the form value with the current service search value
  private syncSearchValueFromService(): void {
    const currentSearchValue: string = this.service().search();
    if (currentSearchValue) {
      this.searchForm.get('search')?.setValue(currentSearchValue);
    }
  }

  // Extracts the input value from an event
  private getInputValueFromEvent(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  // Updates the service search value
  private updateServiceSearchValue(value: string): void {
    this.service().search.set(value);
  }
}
