import { Component, inject, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface Python {
  readonly id: number;
  readonly name: string;
}

const ITEMS: Python[] = [
  { id: 42, name: 'John Cleese' },
  { id: 237, name: 'Eric Idle' },
  { id: 666, name: 'Michael Palin' },
  { id: 123, name: 'Terry Gilliam' },
  { id: 777, name: 'Terry Jones' },
  { id: 999, name: 'Graham Chapman' },
];

@Component({
  selector: 'app-test-view',
  imports: [ReactiveFormsModule],
  templateUrl: './test-view.component.html',
  styleUrl: './test-view.component.scss',
})
export class TestViewComponent implements OnInit {
  items$ = of(ITEMS).pipe(delay(3000));

  private fb = inject(FormBuilder);
  form = this.fb.group({
    name: [''],
  });

  ngOnInit() {
    this.form.get('name')!.valueChanges.subscribe((selectedValue) => {
      console.log('Selected Value:', selectedValue);
      // Fügen Sie hier die Logik hinzu, die ausgeführt werden soll, wenn sich der Wert ändert
    });
  }
}
