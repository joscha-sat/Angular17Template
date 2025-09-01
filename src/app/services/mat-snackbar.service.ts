import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';
import { SnackbarComponentData } from '../shared/api-snackbar/api-snackbar.component';

export type SnackBarTypes = 'info' | 'success' | 'error';
export type SnackBarData = Omit<SnackbarComponentData, 'title'>;
export type MethodType = 'POST' | 'PATCH' | 'DELETE';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(
    component: ComponentType<unknown>,
    type: SnackBarTypes,
    data?: SnackBarData,
    plural: boolean = false,
    horizontalPosition: MatSnackBarHorizontalPosition = 'end',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
  ): void {
    this._snackBar.openFromComponent(component, {
      horizontalPosition,
      verticalPosition,
      panelClass: [`snackbar-${type}`],
      duration: 4000,
      data: { ...data, title: type, plural },
    });
  }
}
