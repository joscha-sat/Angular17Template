import {
  Component,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { Tenant } from '../../../other/models/Tenant';
import { BaseComboboxComponent } from '../../../shared/base-combobox/base-combobox.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { BaseTuiButtonComponent } from '../../../shared/base-tui-button/base-tui-button.component';

import { BaseInputComponent } from '../../../shared/base-input/base-input.component';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';
import { TenantAddEditDialogComponent } from '../tenant-add-edit-dialog/tenant-add-edit-dialog.component';
import { BaseTableSearchComponent } from '../../../shared/base-table-search/base-table-search.component';
import { BaseSearchComponent } from '../../../shared/base-search/base-search.component';
import { BaseSearchDateComponent } from '../../../shared/base-search-date/base-search-date.component';
import {
  BaseTabsComponent,
  TabArray,
} from '../../../shared/base-tabs/base-tabs.component';

@Component({
  selector: 'app-tenant-header',
  standalone: true,
  imports: [
    TranslateModule,
    TuiButtonModule,
    BaseComboboxComponent,
    ReactiveFormsModule,
    BaseTuiButtonComponent,
    HeaderLayoutComponent,
    BaseInputComponent,
    BaseTableSearchComponent,
    BaseSearchComponent,
    BaseSearchDateComponent,
    BaseTabsComponent,
  ],
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss',
})
export class TenantHeaderComponent implements OnInit, OnChanges {
  tenants = input.required<Tenant[]>();
  form: FormGroup = new FormGroup({});
  tabArray = signal<TabArray[]>([
    { i18nTitle: 'general.active' },
    { i18nTitle: 'general.inactive' },
  ]);

  constructor(
    private fb: FormBuilder,
    public tenantService: TenantService,
    private dialogService: TuiDialogHelperService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [],
    });
  }

  onTenantChange($event: { id: string; label: string }) {
    this.tenantService.selectedTenantId.set($event.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tenants'] &&
      changes['tenants'].currentValue !== changes['tenants'].previousValue &&
      this.form.controls['name']
    ) {
      this.form.controls['name'].setValue({
        id: this.tenants()[0].id,
        label: this.tenants()[0].name,
      });
    }
  }

  openCreateTenantDialog() {
    this.dialogService.openDialog(TenantAddEditDialogComponent);
  }

  tabChange(tabIndex: number) {
    // TODO
  }
}
