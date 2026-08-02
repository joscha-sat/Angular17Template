import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-role-dropdown',
  imports: [],
  templateUrl: './role-dropdown.component.html',
  styleUrl: './role-dropdown.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class RoleDropdownComponent {}
