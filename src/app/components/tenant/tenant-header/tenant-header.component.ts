import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { Tenant } from "../../../models/Tenant";
import { BaseComboboxComponent } from "../../../shared/base-combobox/base-combobox.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TenantService } from "../../../api/tenant.service";
import { BaseTuiButtonComponent } from "../../../shared/base-tui-button/base-tui-button.component";
import { HeaderLayoutComponent } from "../../../layouts/header-layout/header-layout.component";

@Component({
  selector: "app-tenant-header",
  standalone: true,
  imports: [
    TranslateModule,
    TuiButtonModule,
    BaseComboboxComponent,
    ReactiveFormsModule,
    BaseTuiButtonComponent,
    HeaderLayoutComponent,
  ],
  templateUrl: "./tenant-header.component.html",
  styleUrl: "./tenant-header.component.scss",
})
export class TenantHeaderComponent implements OnInit, OnChanges {
  @Input({ required: true }) tenants: Tenant[] = [];
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private tenantService: TenantService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tenants"] && changes["tenants"].currentValue !== changes["tenants"].previousValue && this.form.controls["name"]) {
      this.form.controls["name"].setValue({ id: this.tenants[0].id, label: this.tenants[0].name });
    }
  }

  onTenantChange($event: { id: string, label: string }) {
    this.tenantService.selectedTenantId.set($event.id)
  }
}

