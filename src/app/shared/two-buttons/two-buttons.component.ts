import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() size: 'm' | 'l' | 'xl' | 's' | 'xs' = 'm';

  @Input() leftBtnTxt: string = this.translateService.instant('general.save');
  @Input() rightBtnTxt: string =
    this.translateService.instant('general.cancel');

  @Input() leftBtnBg: string | undefined;
  @Input() rightBtnBg: string | undefined;

  @Input() leftBtnColor: string | undefined;
  @Input() rightBtnColor: string | undefined;

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
