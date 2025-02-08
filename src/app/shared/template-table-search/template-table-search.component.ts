import { Component, inject, Input, OnInit } from '@angular/core';
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
  @Input({ required: true }) store: any;

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
    this.store.updateSearch(target.value);
    console.log(this.store.search());
  }
}
