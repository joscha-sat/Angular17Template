import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiInputCountModule, TuiTabsModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-base-tabs',
  standalone: true,
  imports: [FormsModule, TuiInputCountModule, TuiTabsModule, TuiSvgModule],
  templateUrl: './base-tabs.component.html',
  styleUrl: './base-tabs.component.scss',
})
export class BaseTabsComponent {
  activeItemIndex = 0;

  onTabChange = output();

  onClick(): void {
    this.onTabChange.emit();
  }
}
