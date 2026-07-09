import { JsonPipe } from '@angular/common';
import { Component, signal, type WritableSignal } from '@angular/core';
import { email, type FieldTree, form, required, submit } from '@angular/forms/signals';
import { InputErrorMsg } from '../../shared/input-error-msg/input-error-msg';
import { TemplateInput } from '../../shared/template-input/template-input';
import { TemplateSelectAutocomplete } from '../../shared/template-select-autocomplete/template-select-autocomplete';
import { Button } from 'primeng/button';
import { ViewLayout } from '../../other/layouts/view-layout/view-layout';

type UserFormTypes = {
  firstName: string;
  lastName: string;
  emailAddress: string;
};

@Component({
  selector: 'app-test-view',
  imports: [TemplateSelectAutocomplete, TemplateInput, InputErrorMsg, JsonPipe, Button, ViewLayout],
  templateUrl: './test-view.html',
  styleUrl: './test-view.scss',
})
export class TestView {
  protected readonly userFormObject: WritableSignal<UserFormTypes> = signal<UserFormTypes>({
    firstName: '',
    lastName: '',
    emailAddress: '',
  });

  protected readonly userForm: FieldTree<UserFormTypes> = form(this.userFormObject, (formSchemaPath) => {
    // firstName
    required(formSchemaPath.firstName, { message: 'Vorname ist ein Pflichtfeld!' });

    // lastName
    required(formSchemaPath.lastName, { message: 'Nachname ist ein Pflichtfeld!' });

    // email
    required(formSchemaPath.emailAddress, { message: 'E-Mail-Adresse ist ein Pflichtfeld!' });
    email(formSchemaPath.emailAddress, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein!' });
  });

  protected readonly submittedSignalFormValue: WritableSignal<UserFormTypes | null> = signal<UserFormTypes | null>(
    null,
  );

  protected submitSignalFormExample(): void {
    submit(this.userForm, async () => {
      this.submittedSignalFormValue.set(this.userFormObject());
      return undefined;
    });
  }
}
