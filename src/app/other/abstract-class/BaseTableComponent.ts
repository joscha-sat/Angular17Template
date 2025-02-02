import { inject, Injectable } from '@angular/core';
import { isObservable, lastValueFrom, Observable } from 'rxjs';
import { UtilityService } from '../../services/utility.service';

@Injectable()
export abstract class BaseTableComponent {
  utilityService = inject(UtilityService);

  setupRefreshSub(): void {
    this.utilityService.tableDataRefreshSubject.subscribe(async () => {
      await this.loadData();
    });
  }

  // Each component must provide data loader, which can return either a Promise or Observable
  protected abstract getLoadDataMethod(): () => Promise<any> | Observable<any>;

  private async loadData(): Promise<void> {
    const loadDataMethod = this.getLoadDataMethod();

    try {
      await this.resolveData(loadDataMethod());
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  private async resolveData(
    dataLoader: Promise<any> | Observable<any>,
  ): Promise<any> {
    if (isObservable(dataLoader)) {
      // Convert Observable to Promise for consistency
      return lastValueFrom(dataLoader);
    }
    return dataLoader; // Already a Promise
  }
}
