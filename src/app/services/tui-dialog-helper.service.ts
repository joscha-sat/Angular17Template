import { inject, Injectable } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable({
  providedIn: 'root',
})
export class TuiDialogHelperService<T = any> {
  dialogService = inject(TuiDialogService);

  openDialog(
    component: any,
    data?: T,
    callback?: () => void,
    appearance?: string,
  ): void {
    this.dialogService
      .open(new PolymorpheusComponent(component), {
        data: data,
        appearance: appearance,
      })
      .subscribe(() => {
        if (callback) callback();
      });
  }

  close(context: TuiDialogContext<boolean>) {
    context.completeWith(false);
  }
}
