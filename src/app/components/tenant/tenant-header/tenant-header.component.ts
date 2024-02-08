import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { Tenant } from "../../../models/Tenant";
import { BaseComboboxComponent } from "../../../shared/base-combobox/base-combobox.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-tenant-header",
  standalone: true,
  imports: [
    TranslateModule,
    TuiButtonModule,
    BaseComboboxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./tenant-header.component.html",
  styleUrl: "./tenant-header.component.scss",
})
export class TenantHeaderComponent implements OnInit, OnChanges {
  @Input({ required: true }) tenants: Tenant[] = [];
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
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
}
