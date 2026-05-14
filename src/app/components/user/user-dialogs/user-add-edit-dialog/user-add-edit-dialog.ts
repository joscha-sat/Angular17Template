import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { User } from '../../../../models/User';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../api/user.service';
import { TwoInputsRowLayout } from '../../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout';
import { AddEdit } from '../../../../other/types/AddEdit.type';
import { RoleDropdown } from './role-dropdown/role-dropdown';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-user-add-edit-dialog',
  imports: [ReactiveFormsModule, TwoInputsRowLayout, RoleDropdown, TranslocoPipe],
  templateUrl: './user-add-edit-dialog.html',
  styleUrl: './user-add-edit-dialog.scss',
})
export class UserAddEditDialog implements OnInit, AddEdit {
  model?: User;
  form!: FormGroup<{
    [K in keyof Partial<User>]: FormControl<User[K]>;
  }>;
  readonly createUserMode: WritableSignal<boolean> = signal(true);
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly userService: UserService = inject(UserService);

  readonly radioItems: WritableSignal<{ name: string }[]> = signal([{ name: 'Active' }, { name: 'Inactive' }]);

  get userFromFormData(): User {
    const formData: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      active?: boolean;
      email?: string;
      roleId?: string;
    } = this.form.getRawValue();

    return new User({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      active: formData.active,
      email: formData.email,
      roleId: formData.roleId,
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
      firstName: [this.model?.firstName ?? '', Validators.required],
      lastName: [this.model?.lastName ?? '', Validators.required],
      phone: [this.model?.phone ?? ''],
      active: [this.model?.active ?? true, Validators.required],
      email: [this.model?.email ?? '', Validators.email],
      roleId: [this.model?.roleId ?? ''],
    }) as FormGroup<{
      [K in keyof Partial<User>]: FormControl<User[K]>;
    }>;
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.createUserMode()) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser(): void {
    this.userService.createOneUser(this.userFromFormData).subscribe(() => {});
  }

  updateUser(): void {
    if (!this.model) {
      return;
    }
    this.userService.updateUserById(this.model.id, this.userFromFormData).subscribe(() => {});
  }
}
