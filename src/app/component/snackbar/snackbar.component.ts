import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-snackbar" 
         [class.show]="(notificationService.snackbar$ | async)?.show" 
         [class.error]="(notificationService.snackbar$ | async)?.type === 'error'"
         [class.loading]="(notificationService.snackbar$ | async)?.type === 'loading'">
        <div class="snackbar-content">
            <i class="fas" 
               [class.fa-check-circle]="(notificationService.snackbar$ | async)?.type === 'success'" 
               [class.fa-exclamation-circle]="(notificationService.snackbar$ | async)?.type === 'error'"
               [class.fa-circle-notch]="(notificationService.snackbar$ | async)?.type === 'loading'"
               [class.fa-spin]="(notificationService.snackbar$ | async)?.type === 'loading'"></i>
            <span>{{ (notificationService.snackbar$ | async)?.message }}</span>
        </div>
        <button class="snackbar-close" (click)="notificationService.hide()" *ngIf="(notificationService.snackbar$ | async)?.type !== 'loading'">&times;</button>
        
        <div class="progress-bar" *ngIf="(notificationService.snackbar$ | async)?.type === 'loading'">
            <div class="progress-bar-value"></div>
        </div>
    </div>
  `,
  styles: [`
    .custom-snackbar {
        position: fixed;
        bottom: -100px;
        right: 2rem;
        background: #0F172A; /* Slate 900 */
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border-left: 4px solid #FFD700; /* Gold 500 */
        min-width: 300px;
        opacity: 0;
        pointer-events: none;
        overflow: hidden; /* For progress bar clipping */

        &.show {
            bottom: 2rem;
            opacity: 1;
            pointer-events: all;
        }

        &.error {
            border-left-color: #ef4444;
            
            i {
                color: #ef4444;
            }
        }

        &.loading {
            border-left-color: #3b82f6; /* Blue for loading */
            
            i {
                color: #3b82f6;
            }
        }

        .snackbar-content {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;

            i {
                font-size: 1.2rem;
                color: #FFD700;
            }

            span {
                font-size: 0.95rem;
                font-weight: 600;
            }
        }

        .snackbar-close {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: color 0.3s ease;

            &:hover {
                color: white;
            }
        }

        .progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            overflow: hidden;

            .progress-bar-value {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 30%;
                background: #3b82f6;
                animation: indeterminate 1.5s infinite ease-in-out;
            }
        }
    }

    @keyframes indeterminate {
        0% {
            left: -30%;
            width: 30%;
        }
        50% {
            width: 50%;
        }
        100% {
            left: 100%;
            width: 30%;
        }
    }
  `]
})
export class SnackbarComponent {
  notificationService = inject(NotificationService);
}
