import { Component, EventEmitter, input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule, TuiButtonOptions } from '@taiga-ui/core';

@Component({
  selector: 'app-base-tui-button',
  standalone: true,
  imports: [TranslateModule, TuiButtonModule],
  templateUrl: './base-tui-button.component.html',
  styleUrl: './base-tui-button.component.scss',
})
export class BaseTuiButtonComponent {
  size = input<'m' | 'l' | 'xl' | 's' | 'xs'>('m');
  appearance = input<TuiButtonOptions['appearance']>('primary');

  @Output() clicked = new EventEmitter();

  onClick() {
    this.clicked.emit();
  }
}
