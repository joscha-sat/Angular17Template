import { Component, input, InputSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-tenant-dashboard-grid',
  imports: [TranslateModule],
  templateUrl: './tenant-dashboard-grid.component.html',
  styleUrl: './tenant-dashboard-grid.component.scss',
})
export class TenantDashboardGridComponent {
  readonly gridDataArray: InputSignal<{ count: number; ngxString: string }[]> =
    input<{ count: number; ngxString: string }[]>([
      { count: 5, ngxString: 'user.title' },
      { count: 2, ngxString: 'customer.title-plural' },
      { count: 490, ngxString: 'order.title-plural' },
      { count: 20, ngxString: 'object.title-plural' },
    ]);

  protected readonly count: typeof count = count;
}
