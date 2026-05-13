import { Component, inject, input, InputSignal, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TemplateInput } from '../template-input/template-input';

type SearchableService = {
  search: WritableSignal<string>;
};

@Component({
  selector: 'app-template-table-search',
  imports: [ReactiveFormsModule, TemplateInput],
  templateUrl: './template-table-search.html',
  styleUrl: './template-table-search.scss',
})
export class TemplateTableSearch implements OnInit {
  readonly service: InputSignal<SearchableService> = input.required<SearchableService>();
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  readonly searchForm: FormGroup = this.createSearchForm();

  ngOnInit(): void {
    this.syncSearchValueFromService();
  }

  handleSearchInputChange(event: Event): void {
    const inputValue: string = this.extractInputValueFromEvent(event);
    this.updateServiceSearchValue(inputValue);
  }

  private createSearchForm(): FormGroup {
    return this.formBuilder.group({
      search: [null],
    });
  }

  private syncSearchValueFromService(): void {
    if (!this.serviceHasSearchProperty()) {
      return;
    }

    const currentSearchValue: string = this.service().search();
    if (currentSearchValue) {
      this.searchForm.get('search')?.setValue(currentSearchValue);
    }
  }

  private serviceHasSearchProperty(): boolean {
    return 'search' in this.service();
  }

  private extractInputValueFromEvent(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  private updateServiceSearchValue(value: string): void {
    this.service().search.set(value);
  }
}
