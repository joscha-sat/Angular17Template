import {
  Component,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Tenant } from '../../../models/Tenant';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
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
  fb: FormBuilder = inject(FormBuilder);
  tenantService: TenantService = inject(TenantService);

  form: FormGroup = new FormGroup({});
  tenants: InputSignal<Tenant[]> = input.required<Tenant[]>();

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
    const tenantsChange: SimpleChange | undefined = changes['tenants'];

    if (
      !tenantsChange.currentValue ||
      tenantsChange.currentValue === tenantsChange.previousValue
    ) {
      return;
    }

    const nameControl: AbstractControl | undefined = this.form.controls['name'];
    const firstTenant: Tenant | undefined = this.tenants()[0];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (nameControl && firstTenant) {
      nameControl.setValue({
        id: firstTenant.id,
        label: firstTenant.name,
      });
    }
  }

  openCreateTenantDialog(): void {
    /* TODO document why this method 'openCreateTenantDialog' is empty */
  }
}
