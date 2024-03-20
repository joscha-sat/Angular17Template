import { Component, Input, signal } from '@angular/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TranslateModule } from '@ngx-translate/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-tenant-dashboard-grid',
  standalone: true,
  imports: [TuiIslandModule, TranslateModule],
  templateUrl: './tenant-dashboard-grid.component.html',
  styleUrl: './tenant-dashboard-grid.component.scss',
})
export class TenantDashboardGridComponent {
  @Input() gridDataArray = signal([
    { count: 5, ngxString: 'user.title' },
    { count: 2, ngxString: 'customer.title-plural' },
    { count: 490, ngxString: 'order.title-plural' },
    { count: 20, ngxString: 'object.title-plural' },
  ]);

  protected readonly count = count;
}
