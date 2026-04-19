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
import { Tenant } from '../../../models/Tenant';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { ButtonModule } from 'primeng/button';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tenant-header',
  imports: [
    ReactiveFormsModule,
    HeaderLayoutComponent,
    ButtonModule,
    TemplateTableSearchComponent,
    TranslocoPipe,
  ],
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss',
})
export class TenantHeaderComponent implements OnInit, OnChanges {
  fb: FormBuilder = inject(FormBuilder);
  tenantService: TenantService = inject(TenantService);

  form: FormGroup = new FormGroup({});
  readonly tenants: InputSignal<Tenant[]> = input.required<Tenant[]>();

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

    if (nameControl && firstTenant) {
      nameControl.setValue({
        id: firstTenant.id,
        label: firstTenant.name,
      });
    }
  }

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

  openCreateTenantDialog(): void {}
}
