import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  imports: [ReactiveFormsModule],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.scss',
})
export class BaseFormComponent {
  form?: FormGroup;
}
