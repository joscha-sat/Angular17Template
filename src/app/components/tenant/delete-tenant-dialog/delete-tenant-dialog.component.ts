import { Component, Inject, OnInit, signal } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/base-dialog/base-dialog.component';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { TwoButtonsComponent } from '../../../shared/two-buttons/two-buttons.component';
import { TenantService } from '../../../api/tenant.service';

@Component({
  selector: 'app-delete-tenant-dialog',
  standalone: true,
  imports: [TwoButtonsComponent],
  templateUrl: './delete-tenant-dialog.component.html',
  styleUrl: './delete-tenant-dialog.component.scss',
})
export class DeleteTenantDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  tenantId = signal<string | undefined>(undefined);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    override readonly context: TuiDialogContext<any>,
    protected override dialogService: TuiDialogHelperService,
    private tenantService: TenantService,
  ) {
    super(context, dialogService);
  }

  ngOnInit(): void {
    this.getDialogData();
  }

  getDialogData() {
    if (!this.context.data) return;
    this.tenantId.set(this.context.data);
  }

  deleteTenant() {
    if (!this.tenantId()) return;
    this.tenantService
      .deleteOneTenant(this.tenantId()!)
      .subscribe(() => this.closeDialog());
  }
}
