import { Component, input, type InputSignal } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-tenant-dashboard-grid',
  imports: [],
  templateUrl: './tenant-dashboard-grid.component.html',
  styleUrl: './tenant-dashboard-grid.component.scss',
})
export class TenantDashboardGridComponent {
  readonly gridDataArray: InputSignal<{ count: number; label: string }[]> =
    input<{ count: number; label: string }[]>([
      { count: 5, label: 'Users' },
      { count: 2, label: 'Customers' },
      { count: 490, label: 'Orders' },
      { count: 20, label: 'Objects' },
    ]);

  protected readonly count: typeof count = count;
}
