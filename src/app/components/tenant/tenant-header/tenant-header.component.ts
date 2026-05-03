import {
  Component,
  inject,
  input,
  InputSignal,
  OnChanges,
} from '@angular/core';
import { Tenant } from '../../../models/Tenant';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { Button } from 'primeng/button';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { DialogService } from 'primeng/dynamicdialog';
import { TenantAddEditDialogComponent } from '../tenant-add-edit-dialog/tenant-add-edit-dialog.component';
import { MODE } from '../../../other/enums/mode.enum';

@Component({
  selector: 'app-tenant-header',
  imports: [
    ReactiveFormsModule,
    HeaderLayoutComponent,
    Button,
    TemplateTableSearchComponent,
    TranslocoPipe,
  ],
  providers: [DialogService],
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss',
})
export class TenantHeaderComponent implements OnChanges {
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly tenantService: TenantService = inject(TenantService);
  private readonly dialogService: DialogService = inject(DialogService);

  form: FormGroup;
  readonly tenants: InputSignal<Tenant[]> = input.required<Tenant[]>();

  constructor() {
    this.form = this.fb.group({
      name: [],
    });
  }

  ngOnChanges(_changes: unknown): void {
    if (!this.tenants().length) {
      return;
    }

    const firstTenant: Tenant = this.tenants()[0];

    this.form.controls['name'].setValue({
      id: firstTenant.id,
      label: firstTenant.name,
    });
  }

  onTenantChange($event: { id: string; label: string }): void {
    this.tenantService.selectedTenantId.set($event.id);
  }

  openCreateTenantDialog(): void {
    this.dialogService.open(TenantAddEditDialogComponent, {
      data: {
        mode: MODE.ADD,
      },
      showHeader: false,
      width: '40vw',
      modal: true,
      dismissableMask: true,
      closable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }
}
