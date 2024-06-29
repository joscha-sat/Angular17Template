import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiDialogHelperService } from '../../services/tui-dialog-helper.service';
import { TranslateModule } from '@ngx-translate/core';
import { tuiIconAlertOctagonLarge } from '@taiga-ui/icons';

export type DeleteContextData = {
  modelData: any;
  service: any;
  deleteMethod: string;
};

@Component({
  selector: 'app-base-delete-dialog',
  standalone: true,
  imports: [TuiSvgModule, TranslateModule, TuiButtonModule],
  templateUrl: './base-delete-dialog.component.html',
  styleUrl: './base-delete-dialog.component.scss',
})
export class BaseDeleteDialogComponent
  extends BaseDialogComponent
  implements OnInit, OnDestroy
{
  modelData?: any;
  service?: { [key: string]: (id: string) => Observable<any> };
  deleteMethod?: string;
  protected readonly tuiIconAlertOctagonLarge = tuiIconAlertOctagonLarge;
  private subscription?: Subscription;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    override readonly context: TuiDialogContext<any, DeleteContextData>,
    protected override dialogService: TuiDialogHelperService,
  ) {
    super(context, dialogService);
  }

  ngOnInit(): void {
    if (this.context.data?.modelData) {
      this.modelData = this.context.data.modelData;
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
      this.modelData.id,
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
