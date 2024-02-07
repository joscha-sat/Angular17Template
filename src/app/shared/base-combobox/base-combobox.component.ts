import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  TuiStringifyContentPipeModule,
} from "@taiga-ui/kit";
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { DropDownItem } from "../../types/DropDownItem";

@Component({
  selector: "app-base-combobox",
  standalone: true,
  imports: [
    TuiComboBoxModule,
    ReactiveFormsModule,
    TuiDataListWrapperModule,
    TuiStringifyContentPipeModule,
    TuiFilterByInputPipeModule,
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

  @Input() idKey = "id";
  @Input() labelKey = "name";

  dropDownItems: DropDownItem[] = [];

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

  // needed because the data might be given async
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataArray"] && changes["dataArray"].currentValue !== changes["dataArray"].previousValue) {
      this.dropDownItems = this.createDropdownItems();
    }
  }
}
