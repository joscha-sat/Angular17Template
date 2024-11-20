import { TuiIslandDirective } from '@taiga-ui/legacy';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-tenant-dashboard-grid',
  imports: [TuiIslandDirective, TranslateModule],
  templateUrl: './tenant-dashboard-grid.component.html',
  styleUrl: './tenant-dashboard-grid.component.scss',
})
export class TenantDashboardGridComponent {
  gridDataArray = input<{ count: number; ngxString: string }[]>([
    { count: 5, ngxString: 'user.title' },
    { count: 2, ngxString: 'customer.title-plural' },
    { count: 490, ngxString: 'order.title-plural' },
    { count: 20, ngxString: 'object.title-plural' },
  ]);

  protected readonly count = count;
}
