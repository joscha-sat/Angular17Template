import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateSelectAutocomplete } from '../../shared/template-select-autocomplete/template-select-autocomplete';

@Component({
  selector: 'app-test-view',
  imports: [ReactiveFormsModule, TemplateSelectAutocomplete],
  templateUrl: './test-view.html',
  styleUrl: './test-view.scss',
})
export class TestView {}
