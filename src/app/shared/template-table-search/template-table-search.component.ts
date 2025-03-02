import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TemplateInputComponent } from '../template-input/template-input.component';

@Component({
  selector: 'app-template-table-search',
  imports: [ReactiveFormsModule, TemplateInputComponent],
  templateUrl: './template-table-search.component.html',
  styleUrl: './template-table-search.component.scss',
})
export class TemplateTableSearchComponent implements OnInit {
  fb = inject(FormBuilder);
  searchForm: FormGroup = new FormGroup({});
  readonly service = input.required<any>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      search: [],
    });
  }

  onSearchChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.service().search.set(target.value);
  }
}
