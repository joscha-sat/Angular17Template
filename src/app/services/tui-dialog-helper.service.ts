import { inject, Injectable } from "@angular/core";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";
import { BaseDialogComponent, DialogData } from "../shared/base-dialog/base-dialog.component";

@Injectable({
  providedIn: "root",
})
export class TuiDialogHelperService {
  dialogService = inject(TuiDialogService);

  openDialog(data?: DialogData, component: any = BaseDialogComponent) {
    this.dialogService
      .open(
        new PolymorpheusComponent(component),
        { data: data },
      )
      .subscribe();
  }

  close(context: TuiDialogContext<boolean, undefined>) {
    context.completeWith(false);
  }
}
