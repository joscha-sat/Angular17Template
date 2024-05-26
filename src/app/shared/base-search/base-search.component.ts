import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';
import { debounceTime, Subject } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-search',
  standalone: true,
  imports: [BaseInputComponent, ReactiveFormsModule],
  templateUrl: './base-search.component.html',
  styleUrl: './base-search.component.scss',
})
export class BaseSearchComponent implements OnInit {
  enteredSearchTerm = new Subject<string>();
  searchValue = signal('');
  @Output() backendSearchEvent = new EventEmitter<string>();
  private fb = inject(FormBuilder);
  // Debounce the search input to prevent excessive calls.
  form: FormGroup = this.fb.group({
    search: '',
  });

  ngOnInit(): void {
    this.searchDebounce();
  }

  // Trigger the search by emitting an event to the parent component.
  searchInBackend(searchTerm: string) {
    this.backendSearchEvent.emit(searchTerm);
  }

  // Update the searchTerm and searchValue each time the search input changes.
  onSearchChange(searchValue: any) {
    this.enteredSearchTerm.next(searchValue);
    this.searchValue.set(searchValue);
  }

  searchDebounce() {
    this.enteredSearchTerm.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.searchInBackend(searchTerm);
    });
  }
}
