import {
  Component,
  inject,
  Inject,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-api-success-snackbar',
  imports: [
    MatSnackBarAction,
    MatSnackBarActions,
    MatIconButton,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './api-success-snackbar.component.html',
  styleUrl: './api-success-snackbar.component.scss',
})
export class ApiSuccessSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  message?: WritableSignal<string>;
  currentDate = signal(new Date());
  protected readonly Date = Date;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.table(data, ['name']);
    if (!data.message) return;

    this.message?.set(data.message);
  }
}
