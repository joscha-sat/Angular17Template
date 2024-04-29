import { Component, Inject, OnInit, signal } from '@angular/core';
import { User } from '../../../other/models/User';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseInputComponent } from '../../../shared/base-input/base-input.component';
import { TwoButtonsComponent } from '../../../shared/two-buttons/two-buttons.component';
import { BaseSaveCancelBtnsComponent } from '../../../shared/base-save-cancel-btns/base-save-cancel-btns.component';
import { UserService } from '../../../api/user.service';
import { BaseDialogComponent } from '../../../shared/base-dialog/base-dialog.component';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiDialogHelperService } from '../../../services/tui-dialog-helper.service';

import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { BaseRadioGroupComponent } from '../../../shared/base-radio-group/base-radio-group.component';
import { BaseComboboxComponent } from '../../../shared/base-combobox/base-combobox.component';
import { TwoInputsRowLayoutComponent } from '../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout.component';

@Component({
  selector: 'app-user-add-edit-dialog',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    BaseInputComponent,
    TwoButtonsComponent,
    BaseSaveCancelBtnsComponent,
    TwoInputsRowLayoutComponent,
    TuiRadioLabeledModule,
    BaseRadioGroupComponent,
    BaseComboboxComponent,
  ],
  templateUrl: './user-add-edit-dialog.component.html',
  styleUrl: './user-add-edit-dialog.component.scss',
})
export class UserAddEditDialogComponent
  extends BaseDialogComponent
  implements OnInit
{
  model: User | undefined;
  form: FormGroup | undefined;
  addUserMode = signal(true);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(POLYMORPHEUS_CONTEXT) context: TuiDialogContext<any>,
    dialogService: TuiDialogHelperService,
  ) {
    super(context, dialogService);
  }

  get userFromFormData(): User {
    // Reads form data and prepares a user object
    const formData = this.form?.value;
    return new User({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      active: formData.active,
      email: formData.email,
      roleId: formData.role.id,
    });
  }

  ngOnInit(): void {
    this.loadModelData();
    this.initForm();
  }

  loadModelData() {
    this.addUserMode.set(true);

    if (!this.context.data) return;
    this.model = this.context.data;
    this.addUserMode.set(false);
  }

  // if the model is provided set the form data with it, else set to null

  initForm() {
    this.form = this.fb.group({
      firstName: [this.model?.firstName ?? null, Validators.required],
      lastName: [this.model?.lastName ?? null, Validators.required],
      phone: [this.model?.phone ?? null],
      active: [this.model?.active ?? true, Validators.required],
      email: [this.model?.email ?? null, Validators.email],
      role: [
        {
          id: this.model?.role?.id ?? 'a0b10022-ff43-455b-8126-2df604fd9384',
          label: this.model?.role?.name ?? 'Rolle',
        },
      ],
    });
  }

  submit() {
    if (this.addUserMode()) {
      this.addUser();
    }
    this.updateUser();
  }

  addUser() {
    this.userService.createOneUser(this.userFromFormData).subscribe();
  }

  updateUser() {
    if (!this.model) return;
    this.userService.updateUserById(this.model?.id, this.userFromFormData);
  }
}
