import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext, TuiIcon } from '@taiga-ui/core';
import { TuiDialogHelperService } from '../../services/tui-dialog-helper.service';
import { TranslateModule } from '@ngx-translate/core';

export type DeleteContextData = {
  model: any;
  service: any;
  deleteMethod: string;
};

@Component({
  selector: 'app-base-delete-dialog',
  imports: [TuiIcon, TranslateModule, TuiButton],
  templateUrl: './base-delete-dialog.component.html',
  styleUrl: './base-delete-dialog.component.scss',
})
export class BaseDeleteDialogComponent
  extends BaseDialogComponent
  implements OnInit, OnDestroy
{
  model?: any;
  service?: { [key: string]: (id: string) => Observable<any> };
  deleteMethod?: string;
  private subscription?: Subscription;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    override readonly context: TuiDialogContext<any, DeleteContextData>,
    protected override dialogService: TuiDialogHelperService,
  ) {
    super(context, dialogService);
  }

  ngOnInit(): void {
    if (this.context.data?.model) {
      this.model = this.context.data.model;
    }

    if (this.context.data?.service) {
      this.service = this.context.data.service;
    }

    if (this.context.data?.deleteMethod) {
      this.deleteMethod = this.context.data.deleteMethod;
    }
  }

  cancelEvent() {
    this.closeDialog();
  }

  deleteEvent() {
    if (!this.service || !this.deleteMethod || !this.service[this.deleteMethod])
      return;

    this.subscription = this.service[this.deleteMethod](
      this.model.id,
    ).subscribe({
      next: () => {
        // Handle successful response here
        this.closeDialog();
      },
      error: (err) => {
        // Handle error here
        console.error('Error occurred', err);
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
