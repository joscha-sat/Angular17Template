import { Component, EventEmitter, Output, signal } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-base-search',
  standalone: true,
  imports: [BaseInputComponent],
  templateUrl: './base-search.component.html',
  styleUrl: './base-search.component.scss',
})
export class BaseSearchComponent {
  enteredSearchTerm = new Subject<string>();
  searchValue = signal('');
  @Output() invokedFetch: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchDebounce();
  }

  // Trigger the search by emitting an event to the parent component.
  searchInBackend(searchTerm: string) {
    this.invokedFetch.next(searchTerm);
  }

  // Update the searchTerm and searchValue each time the search input changes.
  onSearchChange(searchValue: any) {
    console.log(searchValue);
    this.enteredSearchTerm.next(searchValue.value);
    this.searchValue.set(searchValue.value);
  }

  // Debounce the search input to prevent excessive calls.
  searchDebounce() {
    this.enteredSearchTerm.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.searchInBackend(searchTerm);
    });
  }
}
