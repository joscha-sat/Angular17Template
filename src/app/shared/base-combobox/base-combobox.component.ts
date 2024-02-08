import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  TuiStringifyContentPipeModule,
} from "@taiga-ui/kit";
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { DropDownItem } from "../../types/DropDownItem";
import { TuiSizeL, TuiSizeS, TuiTextfieldControllerModule } from "@taiga-ui/core";

@Component({
  selector: "app-base-combobox",
  standalone: true,
  imports: [
    TuiComboBoxModule,
    ReactiveFormsModule,
    TuiDataListWrapperModule,
    TuiStringifyContentPipeModule,
    TuiFilterByInputPipeModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: "./base-combobox.component.html",
  styleUrl: "./base-combobox.component.scss",
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseComboboxComponent implements OnChanges {
  @Input({ required: true }) dataArray: unknown[] = [];
  @Input({ required: true }) fControlName = "";
  @Input() hint: string = "placeholder";


  // this are the property keys which are converted into the dropdown
  @Input() idKey = "id";  //default: item.id for the id in createDropdownItems
  @Input() labelKey = "name"; //default: item.name for the label in createDropdownItems //

  dropDownItems: DropDownItem[] = [];
  // needed because the data might be given async
  @Input() size: TuiSizeL | TuiSizeS = "m";

  // Returns the label of the item to display in the dropdown menu
  readonly stringify = (item: DropDownItem): string => item.label ?? "";

  // creates the dropdown Array depending on the @Input. as default item.name = label and item.id = id
  createDropdownItems(): DropDownItem[] {
    return this.dataArray.map((item: any) => {
      return {
        id: item[this.idKey],
        label: item[this.labelKey],
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataArray"] && changes["dataArray"].currentValue !== changes["dataArray"].previousValue) {
      this.dropDownItems = this.createDropdownItems();
    }
  }
}
