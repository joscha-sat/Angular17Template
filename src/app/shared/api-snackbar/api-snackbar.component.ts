import { Component, inject, signal, type WritableSignal } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import type { SnackbarComponentData } from '../../other/types/snackbar.type';

@Component({
  selector: 'app-api-snackbar',
  imports: [MatSnackBarAction, MatSnackBarActions, MatIconButton, MatIcon, DatePipe, TranslocoPipe],
  templateUrl: './api-snackbar.component.html',
  styleUrl: './api-snackbar.component.scss',
})
export class ApiSnackbarComponent {
  readonly data: SnackbarComponentData<unknown> = inject<SnackbarComponentData>(MAT_SNACK_BAR_DATA);

  readonly snackBarRef: MatSnackBarRef<unknown> = inject(MatSnackBarRef);
  readonly currentDate: WritableSignal<Date> = signal(new Date());

  get alertTitleTranslationKey(): string {
    return `alert.${this.data.title}`;
  }

  get successMessageTranslationKey(): string {
    if (!this.data.methodType) {
      return '';
    }

    const pluralSuffix: string = this.data.plural ? '_plural' : '';
    return `http_success.${this.data.methodType.toLowerCase()}${pluralSuffix}`;
  }
}
