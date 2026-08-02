import { Component, inject, signal, type WritableSignal } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import type { MethodType } from '../../services/mat-snackbar.service';
import { DatePipe } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

export type SnackbarComponentData<T = unknown> = {
  title: 'success' | 'error' | 'info';
  data?: T;
  i18nKeyOrMessage?: string;
  errorStatus?: number;
  methodType?: MethodType;
  plural?: boolean;
};

@Component({
  selector: 'app-api-snackbar',
  imports: [
    MatSnackBarAction,
    MatSnackBarActions,
    MatIconButton,
    MatIcon,
    DatePipe,
    TranslocoPipe,
  ],
  templateUrl: './api-snackbar.component.html',
  styleUrl: './api-snackbar.component.scss',
})
export class ApiSnackbarComponent {
  data: SnackbarComponentData<unknown> =
    inject<SnackbarComponentData>(MAT_SNACK_BAR_DATA);

  snackBarRef: MatSnackBarRef<unknown> = inject(MatSnackBarRef);
  readonly currentDate: WritableSignal<Date> = signal(new Date());
}
