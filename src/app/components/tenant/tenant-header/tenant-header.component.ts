import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Tenant } from '../../../other/models/Tenant';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';

@Component({
  selector: 'app-tenant-header',
  imports: [TranslateModule, ReactiveFormsModule, HeaderLayoutComponent],
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

  openCreateTenantDialog() {}
}
