import { Component, input } from '@angular/core';
import { TuiBadge, TuiStatus } from '@taiga-ui/kit';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base-badge',
  imports: [TuiBadge, TranslateModule, TuiStatus],
  templateUrl: './base-badge.component.html',
  styleUrl: './base-badge.component.scss',
})
export class BaseBadgeComponent {
  status = input.required<string>();
  value = input.required<string>();
}
