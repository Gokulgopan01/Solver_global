import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SnackbarData {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackbarSubject = new BehaviorSubject<SnackbarData>({
    show: false,
    message: '',
    type: 'success'
  });

  snackbar$ = this.snackbarSubject.asObservable();

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  private show(message: string, type: 'success' | 'error') {
    this.snackbarSubject.next({
      show: true,
      message,
      type
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hide();
    }, 5000);
  }

  hide() {
    const current = this.snackbarSubject.value;
    this.snackbarSubject.next({ ...current, show: false });
  }
}
