import { inject, Injectable } from "@angular/core";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";

@Injectable({
  providedIn: "root",
})
export class TuiDialogHelperService {
  dialogService = inject(TuiDialogService);

  openDialog(component: any, data?: any) {
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
