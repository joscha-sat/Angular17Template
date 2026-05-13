import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type SnackBarTypes = 'info' | 'success' | 'error';
export type SnackBarData = { message: string };
export type MethodType = 'POST' | 'PATCH' | 'DELETE';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _messageService: MessageService = inject(MessageService);

  show(type: SnackBarData['message'], severity: SnackBarTypes): void {
    this._messageService.add({
      severity,
      summary: severity === 'error' ? 'Error' : severity === 'success' ? 'Success' : 'Info',
      detail: type,
      life: 4000,
    });
  }

  showError(message: string): void {
    this.show(message, 'error');
  }

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  showInfo(message: string): void {
    this.show(message, 'info');
  }
}
