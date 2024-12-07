import { Component, input } from '@angular/core';
import {
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiContext, TuiLet, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TuiLoader } from '@taiga-ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-object-select',
  imports: [
    TuiSelectModule,
    TuiTextfieldControllerModule,
    FormsModule,
    NgIf,
    NgForOf,
    TuiLoader,
    ReactiveFormsModule,
    AsyncPipe,
    TuiLet,
  ],
  templateUrl: './base-object-select.component.html',
  styleUrl: './base-object-select.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseObjectSelectComponent {
  items$ = input.required<Observable<any>>();
  fControlName = input.required<string>();
  displayKey = input<string>('name');
  itemValue = input<string>('id');

  @tuiPure
  protected stringify(items: any[]): TuiStringHandler<TuiContext<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string]),
    );

    return ({ $implicit }: TuiContext<number>) => map.get($implicit) ?? '';
  }
}
