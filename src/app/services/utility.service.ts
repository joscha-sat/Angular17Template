import { Injectable, WritableSignal } from '@angular/core';
import { DropDownItem } from '../other/types/DropDownItem';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  createDropdownItems(
    dataArray: WritableSignal<any[]>,
    idKey: string = 'id',
    labelKey: string = 'name',
  ): DropDownItem[] {
    return dataArray().map((item: any) => {
      return {
        id: item[idKey],
        label: item[labelKey],
      };
    });
  }
}
