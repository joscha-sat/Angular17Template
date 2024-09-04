import { Component, input } from '@angular/core';
import { TuiBadge } from '@taiga-ui/kit';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base-badge',
  standalone: true,
  imports: [TuiBadge, TranslateModule],
  templateUrl: './base-badge.component.html',
  styleUrl: './base-badge.component.scss',
})
export class BaseBadgeComponent {
  status = input.required<string>();
  value = input.required<string>();
}
