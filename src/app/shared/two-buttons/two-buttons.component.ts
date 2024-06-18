import { Component, EventEmitter, input, Output } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgStyle } from '@angular/common';

// two buttons that stretch evenly to the full parent width including a gap of 1 rem
// the buttons are customizable via @inputs in terms of text, background-color and font color
// the click events are emitted via leftBtnClick, rightBtnClick

@Component({
  selector: 'app-two-buttons',
  standalone: true,
  imports: [TuiButtonModule, NgStyle, TranslateModule],
  templateUrl: './two-buttons.component.html',
  styleUrl: './two-buttons.component.scss',
})
export class TwoButtonsComponent {
  size = input<'m' | 'l' | 'xl' | 's' | 'xs'>('m');

  leftBtnTxt = input<string>(this.translateService.instant('general.save'));
  rightBtnTxt = input<string>(this.translateService.instant('general.cancel'));

  leftBtnBg = input<string>();
  rightBtnBg = input<string>();

  leftBtnColor = input<string>();
  rightBtnColor = input<string>();

  @Output() leftBtnClick = new EventEmitter();
  @Output() rightBtnClick = new EventEmitter();

  constructor(private translateService: TranslateService) {}

  onLeftBtnClick() {
    this.leftBtnClick.emit();
  }

  onRightBtnClick() {
    this.rightBtnClick.emit();
  }
}
