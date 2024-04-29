import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-base-table-search',
  standalone: true,
  imports: [ReactiveFormsModule, BaseInputComponent],
  templateUrl: './base-table-search.component.html',
  styleUrl: './base-table-search.component.scss',
})
export class BaseTableSearchComponent implements OnInit {
  fb = inject(FormBuilder);
  searchForm: FormGroup = new FormGroup({});
  @Input({ required: true }) service: any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      search: [],
    });
  }

  onSearchChange($event: any) {
    this.service.search.set($event.target.value);
  }
}
