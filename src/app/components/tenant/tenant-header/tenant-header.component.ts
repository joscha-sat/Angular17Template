import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Tenant } from '../../../models/Tenant';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { MatButton } from '@angular/material/button';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';

@Component({
  selector: 'app-tenant-header',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    HeaderLayoutComponent,
    MatButton,
    TemplateTableSearchComponent,
  ],
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss',
})
export class TenantHeaderComponent implements OnInit, OnChanges {
  fb = inject(FormBuilder);
  tenantService = inject(TenantService);

  form: FormGroup = new FormGroup({});
  tenants = input.required<Tenant[]>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [],
    });
  }

  onTenantChange($event: { id: string; label: string }): void {
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

  openCreateTenantDialog(): void {}
}
