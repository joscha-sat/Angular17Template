import { Component, input } from '@angular/core';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-base-card',
  imports: [
    TuiPlatform,
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TranslatePipe,
  ],
  templateUrl: './base-card.component.html',
  styleUrl: './base-card.component.scss',
})
export class BaseCardComponent {
  hasHeader = input<boolean>(true);
  hasContent = input<boolean>(true);
  hasFooter = input<boolean>(true);

  title = input<string>('');
}
