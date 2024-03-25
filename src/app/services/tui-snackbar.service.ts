import { Inject, Injectable } from "@angular/core";
import { TuiAlertService, TuiNotificationT } from "@taiga-ui/core";
import { take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TuiSnackbarService {
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {
  }

  openSnackbar(type: TuiNotificationT, header: string, text?: string): void {
    this.alerts
      .open(text || "",
        {
          label: header,
          autoClose: true,
          hasCloseButton: true,
          status: type,
        },
      )
      .pipe(take(1))
      .subscribe();
  }

  // currently not needed
  // getTranslations(type: TuiNotificationT): string {
  //   switch (type) {
  //     case "neutral":
  //       return this.translateService.instant("alert.neutral");
  //     case "info":
  //       return this.translateService.instant("alert.info");
  //     case "success":
  //       return this.translateService.instant("alert.success");
  //     case "warning":
  //       return this.translateService.instant("alert.warn");
  //     case "error":
  //       return this.translateService.instant("alert.error");
  //     default:
  //       return "";
  //   }
  // }
}
