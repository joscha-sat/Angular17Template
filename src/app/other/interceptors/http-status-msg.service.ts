import { Injectable, Injector } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class HttpStatusMsgService {
  constructor(private injector: Injector) {
  }

  private get translateService(): TranslateService {
    return this.injector.get(TranslateService);
  }

  getStatusErrorMessage = (err: any): string => {
    const errMsg = err.error.message;

    switch (err.status) {
      // Bad Request
      case 400: {
        return this.translateService.instant('http.status-400') ?? errMsg
      }
      // Unauthorized
      case 401: {
        return this.translateService.instant('http.status-401') ?? errMsg
      }
      // Forbidden
      case 403: {
        return this.translateService.instant('http.status-403') ?? errMsg
      }
      // Not Found
      case 404: {
        return this.translateService.instant('http.status-404') ?? errMsg
      }
      // Not Acceptable
      case 406: {
        return this.translateService.instant('http.status-406') ?? errMsg;
      }
      // Conflict
      case 409: {
        return this.translateService.instant('http.status-409') ?? errMsg
      }
      // Internal server error
      case 500: {
        return this.translateService.instant('http.status-500') ?? errMsg
      }
      default: {
        return `Unbekannter Fehler, Statuscode ${ err.status }.`;
      }
    }
  }
}


