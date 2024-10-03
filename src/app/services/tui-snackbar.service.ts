import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class TuiSnackbarService {
  protected readonly alerts = inject(TuiAlertService);
  private sanitizer = inject(DomSanitizer);

  openSnackbar(type: string, header: string, text?: string): void {
    const dateString = DateTime.now()
      .setLocale('de')
      .toLocaleString(DateTime.DATETIME_SHORT);

    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      `
        <div style="display: flex; justify-content: space-between; gap: 1rem">
            <span style="font-weight: 700; font-size: 16px">${header}</span>
            <span style="font-size: 12px">${dateString}</span>
        </div>

        <div style="padding-top: 0.5rem; font-size: 14px">
        ${text ? text : ''}
       </div>`,
    );

    this.alerts
      .open(safeHtml ?? '', {
        autoClose: 10000000,
        closeable: true,
        appearance: type,
      })
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
