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
         [class.error]="(notificationService.snackbar$ | async)?.type === 'error'">
        <div class="snackbar-content">
            <i class="fas" 
               [class.fa-check-circle]="(notificationService.snackbar$ | async)?.type === 'success'" 
               [class.fa-exclamation-circle]="(notificationService.snackbar$ | async)?.type === 'error'"></i>
            <span>{{ (notificationService.snackbar$ | async)?.message }}</span>
        </div>
        <button class="snackbar-close" (click)="notificationService.hide()">&times;</button>
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
    }
  `]
})
export class SnackbarComponent {
  notificationService = inject(NotificationService);
}
