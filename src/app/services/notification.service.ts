import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SnackbarData {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'loading';
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackbarSubject = new BehaviorSubject<SnackbarData>({
    show: false,
    message: '',
    type: 'success',
    title: ''
  });

  snackbar$ = this.snackbarSubject.asObservable();
  private hideTimeout: any;

  get currentValue(): SnackbarData {
    return this.snackbarSubject.value;
  }

  showLoading(message: string, title?: string) {
    this.show(message, 'loading', title);
  }

  showSuccess(message: string, title?: string) {
    this.show(message, 'success', title);
  }

  showError(message: string, title?: string) {
    this.show(message, 'error', title);
  }

  private show(message: string, type: 'success' | 'error' | 'loading', title?: string) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    this.snackbarSubject.next({
      show: true,
      message,
      type,
      title
    });

    // Only auto-hide for success and error
    if (type !== 'loading') {
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, 7000);
    }
  }

  hide() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    const current = this.snackbarSubject.value;
    this.snackbarSubject.next({ ...current, show: false });
  }
}
