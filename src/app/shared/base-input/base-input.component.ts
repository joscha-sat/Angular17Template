import { Component, Input } from "@angular/core";
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputNumberModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { TuiErrorModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { AsyncPipe } from "@angular/common";
import { TuiCurrencyPipeModule } from "@taiga-ui/addon-commerce";

@Component({
  selector: "app-base-input",
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiInputPasswordModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiCurrencyPipeModule,
  ],
  templateUrl: "./base-input.component.html",
  styleUrl: "./base-input.component.scss",
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class BaseInputComponent {
  @Input({ required: true }) type: InputTypes = "text";
  @Input({ required: true }) fControlName: string = "";

  // workaround to use the input type as default label value
  private _label?: string;

  get label(): string {
    return this._label || `enter a ${ this.type }`;
  }

  @Input()
  set label(value: string) {
    this._label = value;
  }


}


type InputTypes = "text" | "number" | "password" | "email";
