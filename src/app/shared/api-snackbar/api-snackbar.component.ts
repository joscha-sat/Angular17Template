import { Component, inject, Inject, signal } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MethodType } from '../../services/mat-snackbar.service';

export type SnackbarComponentData<T = any> = {
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
    TranslatePipe,
  ],
  templateUrl: './api-snackbar.component.html',
  styleUrl: './api-snackbar.component.scss',
})
export class ApiSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  currentDate = signal(new Date());

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarComponentData) {}
}
