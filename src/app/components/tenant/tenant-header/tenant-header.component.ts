import { Component, Input, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { Tenant } from "../../../models/Tenant";
import { BaseComboboxComponent } from "../../../shared/base-combobox/base-combobox.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
export class TenantHeaderComponent implements OnInit {
  @Input({ required: true }) tenants: Tenant[] = [];
  form: FormGroup = new FormGroup({});


  ngOnInit(): void {
    console.log(this.tenants);
    this.form.addControl("name", new FormControl(""));
  }
}
