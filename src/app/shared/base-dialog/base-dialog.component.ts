import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { TuiButtonModule, TuiDialogContext } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TwoButtonsComponent } from "../two-buttons/two-buttons.component";
import { TuiDialogHelperService } from "../../services/tui-dialog-helper.service";
import { TranslateService } from "@ngx-translate/core";

export type DialogData = {
  title: string;
  content: string;
}

@Component({
  selector: "app-base-dialog",
  standalone: true,
  imports: [
    TuiButtonModule,
    TwoButtonsComponent,
  ],
  templateUrl: "./base-dialog.component.html",
  styleUrl: "./base-dialog.component.scss",
})
export class BaseDialogComponent implements OnInit {
  data: DialogData | undefined;

  @Input() size: "m" | "l" | "xl" | "s" | "xs" = "m";
  @Input() leftBtnTxt: string = this.translateService.instant("general.save");
  @Input() rightBtnTxt: string = this.translateService.instant("general.cancel");
  @Input() leftBtnBg: string | undefined;
  @Input() rightBtnBg: string | undefined;
  @Input() leftBtnColor: string | undefined;
  @Input() rightBtnColor: string | undefined;

  @Output() leftBtnClick = new EventEmitter();

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any>, private dialogService: TuiDialogHelperService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    if (this.context.data) {
      this.data = this.context.data;
    }
  }

  closeDialog() {
    this.dialogService.close(this.context);
  }

  onLeftBtnClick() {
    this.leftBtnClick.emit();
  }
}
