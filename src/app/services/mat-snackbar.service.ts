import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  type MatSnackBarHorizontalPosition,
  type MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import type { ComponentType } from '@angular/cdk/overlay';
import type { SnackBarData, SnackBarTypes } from '../other/types/snackbar.type';

export type { MethodType, SnackBarData, SnackBarTypes } from '../other/types/snackbar.type';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  openSnackBar(
    component: ComponentType<unknown>,
    type: SnackBarTypes,
    data?: SnackBarData,
    plural: boolean = data?.plural ?? false,
    horizontalPosition: MatSnackBarHorizontalPosition = 'end',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
  ): void {
    this.snackBar.openFromComponent(component, {
      horizontalPosition,
      verticalPosition,
      panelClass: [`snackbar-${type}`],
      duration: 4000,
      data: { ...data, title: type, plural },
    });
  }
}
