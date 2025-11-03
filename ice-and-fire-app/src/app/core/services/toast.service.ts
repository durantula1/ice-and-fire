import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DEFAULT_TOAST_TITLE, ToastSeverity } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string, title: string = DEFAULT_TOAST_TITLE.SUCCESS) {
    this.messageService.add({
      severity: ToastSeverity.SUCCESS,
      summary: title,
      detail: message,
    });
  }

  showError(message: string, title: string = DEFAULT_TOAST_TITLE.ERROR) {
    this.messageService.add({
      severity: ToastSeverity.ERROR,
      summary: title,
      detail: message,
    });
  }

  showInfo(message: string, title: string = DEFAULT_TOAST_TITLE.INFO) {
    this.messageService.add({
      severity: ToastSeverity.INFO,
      summary: title,
      detail: message,
    });
  }

  showWarning(message: string, title: string = DEFAULT_TOAST_TITLE.WARNING) {
    this.messageService.add({
      severity: ToastSeverity.WARNING,
      summary: title,
      detail: message,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
