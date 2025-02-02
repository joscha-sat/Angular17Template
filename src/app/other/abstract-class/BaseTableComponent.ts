import { inject, OnInit } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

export abstract class BaseTableComponent implements OnInit {
  utilityService = inject(UtilityService);

  async ngOnInit(): Promise<void> {
    this.setupRefreshSub();
    await this.getLoadDataMethod()();
  }

  setupRefreshSub(): void {
    this.utilityService.tableDataRefreshSubject.subscribe(async () => {
      await this.getLoadDataMethod()();
    });
  }

  // Child components must provide the name or function to call
  protected abstract getLoadDataMethod(): () => Promise<void>;
}
