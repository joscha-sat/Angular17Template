import { inject, Injectable, WritableSignal } from '@angular/core';
import { DropDownItem } from '../other/types/DropDownItem.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  router = inject(Router);

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

  urlContainsName(name: string): Observable<boolean> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.includes(name)),
    );
  }
}
