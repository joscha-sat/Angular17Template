import { inject, Injectable } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable({
  providedIn: 'root',
})
export class TuiDialogHelperService<T = any> {
  dialogService = inject(TuiDialogService);

  openDialog(component: any, data?: T) {
    this.dialogService
      .open(new PolymorpheusComponent(component), { data: data })
      .subscribe();
  }

  close(context: TuiDialogContext<boolean, undefined>) {
    context.completeWith(false);
  }
}
