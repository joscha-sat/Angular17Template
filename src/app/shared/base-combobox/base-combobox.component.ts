import {
  TuiComboBoxModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiValueChanges } from '@taiga-ui/cdk';
import {
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  TuiDataListWrapper,
  TuiFilterByInputPipe,
  TuiStringifyContentPipe,
} from '@taiga-ui/kit';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropDownItem } from '../../other/types/DropDownItem.type';

@Component({
  selector: 'app-base-combobox',
  imports: [
    TuiComboBoxModule,
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiStringifyContentPipe,
    TuiFilterByInputPipe,
    TuiTextfieldControllerModule,
    TranslateModule,
    TuiValueChanges,
  ],
  templateUrl: './base-combobox.component.html',
  styleUrl: './base-combobox.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseComboboxComponent<T> implements OnChanges {
  dataArray = input.required<T[]>();
  fControlName = input.required<string>();
  hint = input<string>('placeholder');
  size = input<TuiSizeL | TuiSizeS>('m');

  // these are the property keys which are converted into the dropdown
  //default: item.id for the id in createDropdownItems
  idKey = input<string>('id');

  //default: item.name for the label in createDropdownItems //
  labelKey = input<string>('name');

  valueChange = output<any>();

  dropDownItems: DropDownItem[] = [];

  // Returns the label of the item to display in the dropdown menu
  readonly stringify = (item: DropDownItem): string => item.label ?? '';

  // creates the dropdown Array depending on the @Input. as default item.name = label and item.id = id
  createDropdownItems(): DropDownItem[] {
    return this.dataArray().map((item: any) => {
      return {
        id: item[this.idKey()],
        label: item[this.labelKey()],
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dataArray'] &&
      changes['dataArray'].currentValue !== changes['dataArray'].previousValue
    ) {
      this.dropDownItems = this.createDropdownItems();
    }
  }

  onChange(event: any) {
    this.valueChange.emit(event);
  }
}
