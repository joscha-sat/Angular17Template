import { Component, OnInit, signal } from '@angular/core';
import { User } from '../../../other/models/User';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../api/user.service';
import { TwoInputsRowLayoutComponent } from '../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout.component';
import { AddEdit } from '../../../other/types/AddEdit.type';
import { RoleDropdownComponent } from './role-dropdown/role-dropdown.component';

@Component({
  selector: 'app-user-add-edit-dialog',
  imports: [
    TranslateModule,
    ReactiveFormsModule,

    TwoInputsRowLayoutComponent,

    RoleDropdownComponent,
  ],
  templateUrl: './user-add-edit-dialog.component.html',
  styleUrl: './user-add-edit-dialog.component.scss',
})
export class UserAddEditDialogComponent implements OnInit, AddEdit {
  model?: User;
  form?: FormGroup;
  radioItems = signal([
    { name: this.translateService.instant('general.active') },
    { name: this.translateService.instant('general.inactive') },
  ]);
  createUserMode = signal(true);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private translateService: TranslateService,
  ) {}

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

  loadModelData(): void {
    this.createUserMode.set(true);
    this.createUserMode.set(false);
  }

  // if the model is provided set the form data with it, else set to null
  initForm(): void {
    this.form = this.fb.group({
      firstName: [this.model?.firstName ?? null, Validators.required],
      lastName: [this.model?.lastName ?? null, Validators.required],
      phone: [this.model?.phone ?? null],
      active: [this.getActiveStatus(), Validators.required],
      email: [this.model?.email ?? null, Validators.email],
      role: '',
    });
  }

  submit() {
    this.convertStringStatusToBoolean();

    if (this.createUserMode()) {
      this.createUser();
    }
    this.updateUser();
  }

  createUser() {
    this.userService.createOneUser(this.userFromFormData).subscribe(() => {});
  }

  updateUser() {
    if (!this.model) return;
    this.userService
      .updateUserById(this.model?.id, this.userFromFormData)
      .subscribe(() => {});
  }

  getActiveStatus = () => {
    if (this.model?.active === null || this.model?.active === undefined) {
      return 'Aktiv';
    } else {
      return this.model?.active ? 'Aktiv' : 'Inaktiv';
    }
  };

  convertStringStatusToBoolean() {
    if (this.form?.controls['active'].value === 'Aktiv') {
      this.form.controls['active'].patchValue(true);
    } else {
      this.form?.controls['active'].patchValue(false);
    }
  }
}
