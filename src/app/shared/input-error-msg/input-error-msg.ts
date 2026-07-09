import { Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import type { FieldState, FieldTree, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-input-error-msg',
  imports: [],
  templateUrl: './input-error-msg.html',
  styleUrl: './input-error-msg.scss',
})
export class InputErrorMsg {
  readonly field: InputSignal<FieldTree<unknown>> = input.required<FieldTree<unknown>>();

  protected readonly fieldState: Signal<FieldState<unknown>> = computed(() => this.field()());

  protected readonly shouldShowErrors: Signal<boolean> = computed(
    () => this.fieldState().touched() && this.fieldState().invalid(),
  );

  protected readonly errors: Signal<ValidationError[]> = computed(() => this.fieldState().errors());
}
