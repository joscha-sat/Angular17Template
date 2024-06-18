import { Component, input } from '@angular/core';
import { TuiBadgeModule, TuiStatus } from '@taiga-ui/kit';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base-badge',
  standalone: true,
  imports: [TuiBadgeModule, TranslateModule],
  templateUrl: './base-badge.component.html',
  styleUrl: './base-badge.component.scss',
})
export class BaseBadgeComponent {
  status = input.required<TuiStatus>();
  value = input.required<string>();
}
