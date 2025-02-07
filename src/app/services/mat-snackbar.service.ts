import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';

export type SnackBarTypes = 'info' | 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(
    component: ComponentType<unknown>,
    type: SnackBarTypes,
    data?: any,
    horizontalPosition: MatSnackBarHorizontalPosition = 'end',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
  ): void {
    this._snackBar.openFromComponent(component, {
      horizontalPosition,
      verticalPosition,
      panelClass: [`snackbar-${type}`],
      // duration: 3000,
      data,
    });
  }
}
