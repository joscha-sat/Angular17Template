import { Component, inject, type OnInit, signal, type WritableSignal } from '@angular/core';
import { User } from '../../../../models/User';
import {
  type FormControl,
  type FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../api/user.service';
import { TwoInputsRowLayoutComponent } from '../../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout.component';
import type { AddEdit } from '../../../../other/types/AddEdit.type';
import { RoleDropdownComponent } from './role-dropdown/role-dropdown.component';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-user-add-edit-dialog',
  imports: [ReactiveFormsModule, TwoInputsRowLayoutComponent, RoleDropdownComponent, TranslocoPipe],
  templateUrl: './user-add-edit-dialog.component.html',
  styleUrl: './user-add-edit-dialog.component.scss',
})
export class UserAddEditDialogComponent implements OnInit, AddEdit {
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly userService: UserService = inject(UserService);

  model?: User;
  form!: FormGroup<{
    [K in keyof Partial<User>]: FormControl<User[K]>;
  }>;
  readonly createUserMode: WritableSignal<boolean> = signal(true);

  private getFormValue<T extends keyof User>(propertyName: T, defaultValue: User[T]): User[T] {
    if (this.model === undefined) {
      return defaultValue;
    }

    return this.model[propertyName] ?? defaultValue;
  }

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
    this.createUserMode.set(this.model === undefined);
  }

  // Initialize the form with model data when editing and empty defaults when creating.
  initForm(): void {
    this.form = this.fb.group({
      firstName: [this.getFormValue('firstName', ''), Validators.required],
      lastName: [this.getFormValue('lastName', ''), Validators.required],
      phone: [this.getFormValue('phone', '')],
      active: [this.getFormValue('active', true), Validators.required],
      email: [this.getFormValue('email', ''), Validators.email],
      roleId: [this.getFormValue('roleId', '')],
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
    this.userService.createOneUser(this.userFromFormData).subscribe();
  }

  updateUser(): void {
    if (!this.model) {
      return;
    }
    this.userService.updateUserById(this.model.id, this.userFromFormData).subscribe();
  }
}
