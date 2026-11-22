import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-overlay" 
         *ngIf="(notificationService.snackbar$ | async)?.show"
         (click)="onBackdropClick($event)">
      
      <div class="rectangle-box" 
           [class.box-loading]="(notificationService.snackbar$ | async)?.type === 'loading'"
           [class.box-success]="(notificationService.snackbar$ | async)?.type === 'success'"
           [class.box-error]="(notificationService.snackbar$ | async)?.type === 'error'"
           (click)="$event.stopPropagation()">
        
        <!-- Top close button (hidden while actively sending) -->
        <button class="box-close-btn" 
                *ngIf="(notificationService.snackbar$ | async)?.type !== 'loading'"
                (click)="notificationService.hide()"
                title="Close modal"
                aria-label="Close">
          <i class="fas fa-times"></i>
        </button>

        <!-- SENDING IMAGE / GRAPHIC (Loading State) -->
        <div class="modal-image-wrapper sending-stage" *ngIf="(notificationService.snackbar$ | async)?.type === 'loading'">
          <div class="sending-graphic-container">
            <!-- Pulsing Radar Glow Rings -->
            <div class="radar-pulse-ring ring-1"></div>
            <div class="radar-pulse-ring ring-2"></div>
            
            <!-- Animated Flight Path SVG -->
            <svg class="flight-trail-svg" viewBox="0 0 140 100" fill="none">
              <path class="trail-curve" d="M 15 80 Q 55 10, 115 35" />
              <circle cx="20" cy="78" r="2.5" class="trail-dot dot-1" />
              <circle cx="50" cy="40" r="3" class="trail-dot dot-2" />
              <circle cx="85" cy="24" r="2.5" class="trail-dot dot-3" />
            </svg>

            <!-- Sending Paper Airplane Image / Icon Box -->
            <div class="plane-flight-box">
              <i class="fas fa-paper-plane plane-icon"></i>
            </div>

            <!-- Sparkling Particles -->
            <span class="sparkle sp-1">✦</span>
            <span class="sparkle sp-2">✦</span>
            <span class="sparkle sp-3">★</span>
          </div>
        </div>

        <!-- CONFIRMATION IMAGE / GRAPHIC (Success State) -->
        <div class="modal-image-wrapper confirmation-stage" *ngIf="(notificationService.snackbar$ | async)?.type === 'success'">
          <div class="confirmation-graphic-container">
            <!-- Glowing Success Halo -->
            <div class="success-halo"></div>
            
            <!-- SVG Animated Checkmark Seal -->
            <div class="seal-circle">
              <svg class="check-svg" viewBox="0 0 80 80">
                <circle class="check-circle-outline" cx="40" cy="40" r="35" />
                <path class="check-tick-path" d="M 23 41 L 34 52 L 57 28" />
              </svg>
            </div>

            <!-- Celebration Stars / Confetti -->
            <span class="celebrate-star star-1">★</span>
            <span class="celebrate-star star-2">✦</span>
            <span class="celebrate-star star-3">★</span>
            <span class="celebrate-star star-4">✦</span>
          </div>
        </div>

        <!-- ERROR IMAGE / GRAPHIC (Error State) -->
        <div class="modal-image-wrapper error-stage" *ngIf="(notificationService.snackbar$ | async)?.type === 'error'">
          <div class="error-graphic-container">
            <div class="error-halo"></div>
            <div class="error-seal">
              <i class="fas fa-exclamation-triangle error-icon"></i>
            </div>
          </div>
        </div>

        <!-- TEXT CONTENT -->
        <div class="box-body">
          <h3 class="box-title">
            <ng-container *ngIf="(notificationService.snackbar$ | async)?.title as customTitle; else defaultTitle">
              {{ customTitle }}
            </ng-container>
            <ng-template #defaultTitle>
              <span *ngIf="(notificationService.snackbar$ | async)?.type === 'loading'">Sending in Progress...</span>
              <span *ngIf="(notificationService.snackbar$ | async)?.type === 'success'">Submission Confirmed!</span>
              <span *ngIf="(notificationService.snackbar$ | async)?.type === 'error'">Submission Notice</span>
            </ng-template>
          </h3>

          <p class="box-message">
            {{ (notificationService.snackbar$ | async)?.message }}
          </p>

          <!-- Sending Status Details & Progress Bar -->
          <div class="sending-progress-section" *ngIf="(notificationService.snackbar$ | async)?.type === 'loading'">
            <div class="custom-progress-track">
              <div class="custom-progress-bar"></div>
            </div>
            <div class="transmitting-badge">
              <i class="fas fa-shield-alt"></i>
              <span>Processing securely with Solver Global</span>
            </div>
          </div>

          <!-- Action Button for Confirmation / Error -->
          <div class="box-actions" *ngIf="(notificationService.snackbar$ | async)?.type !== 'loading'">
            <button class="btn-confirm-action" 
                    [class.btn-success]="(notificationService.snackbar$ | async)?.type === 'success'"
                    [class.btn-error]="(notificationService.snackbar$ | async)?.type === 'error'"
                    (click)="notificationService.hide()">
              <span *ngIf="(notificationService.snackbar$ | async)?.type === 'success'">
                OK, Got It <i class="fas fa-check"></i>
              </span>
              <span *ngIf="(notificationService.snackbar$ | async)?.type === 'error'">
                Dismiss <i class="fas fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* Fixed Full-Screen Backdrop Overlay Centering the Rectangle Box */
    .notification-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(5, 11, 24, 0.78);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      padding: 1.25rem;
      animation: overlayFadeIn 0.25s ease-out forwards;
    }

    /* Centered Rectangle Box */
    .rectangle-box {
      position: relative;
      width: 100%;
      max-width: 480px;
      background: linear-gradient(160deg, #0e172a 0%, #070d18 100%);
      border: 2px solid rgba(255, 215, 0, 0.45);
      border-radius: 20px;
      padding: 2.6rem 2.2rem 2.2rem;
      text-align: center;
      color: #ffffff;
      box-shadow: 
        0 25px 70px rgba(0, 0, 0, 0.85),
        0 0 45px rgba(255, 215, 0, 0.16);
      transform: scale(0.92);
      opacity: 0;
      animation: rectanglePopIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      overflow: hidden;

      &.box-loading {
        border-color: rgba(59, 130, 246, 0.55);
        box-shadow: 
          0 25px 70px rgba(0, 0, 0, 0.85),
          0 0 45px rgba(59, 130, 246, 0.2);
      }

      &.box-success {
        border-color: #ffd700;
        box-shadow: 
          0 25px 70px rgba(0, 0, 0, 0.85),
          0 0 50px rgba(255, 215, 0, 0.22);
      }

      &.box-error {
        border-color: rgba(239, 68, 68, 0.6);
        box-shadow: 
          0 25px 70px rgba(0, 0, 0, 0.85),
          0 0 40px rgba(239, 68, 68, 0.2);
      }
    }

    /* Modal Close Button */
    .box-close-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      color: #94a3b8;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 10;

      &:hover {
        background: rgba(255, 215, 0, 0.2);
        border-color: #ffd700;
        color: #ffffff;
        transform: rotate(90deg);
      }
    }

    /* Stage Wrapper for Visual Images */
    .modal-image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    /* ========================================================
       1. SENDING IMAGE & ANIMATION (Loading State)
       ======================================================== */
    .sending-graphic-container {
      position: relative;
      width: 130px;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;

      .radar-pulse-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        border: 2px solid rgba(59, 130, 246, 0.5);
        pointer-events: none;

        &.ring-1 {
          width: 90px;
          height: 90px;
          animation: ringPulse 2s infinite ease-out;
        }

        &.ring-2 {
          width: 120px;
          height: 120px;
          animation: ringPulse 2s infinite ease-out 0.6s;
        }
      }

      .flight-trail-svg {
        position: absolute;
        width: 120px;
        height: 90px;
        top: 8px;
        left: 5px;
        pointer-events: none;

        .trail-curve {
          stroke: #ffd700;
          stroke-width: 2.5;
          stroke-dasharray: 6 5;
          stroke-linecap: round;
          animation: dashMove 1.2s linear infinite;
        }

        .trail-dot {
          fill: #38bdf8;
          animation: dotBlink 1.4s infinite ease-in-out alternate;

          &.dot-2 { animation-delay: 0.3s; }
          &.dot-3 { animation-delay: 0.6s; }
        }
      }

      .plane-flight-box {
        position: relative;
        z-index: 3;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        border: 2px solid #ffd700;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0 10px 25px rgba(59, 130, 246, 0.5),
          0 0 20px rgba(255, 215, 0, 0.35);
        animation: airplaneFloat 2.2s infinite ease-in-out;

        .plane-icon {
          font-size: 1.85rem;
          color: #ffffff;
          transform: rotate(-15deg);
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.4));
        }
      }

      .sparkle {
        position: absolute;
        color: #ffd700;
        pointer-events: none;

        &.sp-1 {
          top: 10px;
          right: 15px;
          font-size: 1.2rem;
          animation: sparkleAnim 1.6s infinite ease-in-out;
        }

        &.sp-2 {
          bottom: 15px;
          left: 12px;
          font-size: 0.95rem;
          animation: sparkleAnim 1.6s infinite ease-in-out 0.5s;
        }

        &.sp-3 {
          top: 38px;
          right: 2px;
          font-size: 1rem;
          animation: sparkleAnim 1.6s infinite ease-in-out 1s;
        }
      }
    }

    /* ========================================================
       2. CONFIRMATION IMAGE & ANIMATION (Success State)
       ======================================================== */
    .confirmation-graphic-container {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;

      .success-halo {
        position: absolute;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(255, 215, 0, 0.15) 60%, transparent 100%);
        animation: haloPulse 2.5s infinite ease-in-out;
      }

      .seal-circle {
        position: relative;
        z-index: 2;
        width: 86px;
        height: 86px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(15, 23, 42, 0.9) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(16, 185, 129, 0.4);
        box-shadow: 
          0 10px 30px rgba(16, 185, 129, 0.35),
          0 0 25px rgba(255, 215, 0, 0.25);
        animation: sealPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

        .check-svg {
          width: 70px;
          height: 70px;

          .check-circle-outline {
            fill: none;
            stroke: #10b981;
            stroke-width: 4;
            stroke-dasharray: 230;
            stroke-dashoffset: 230;
            animation: strokeCircle 0.6s ease-out 0.1s forwards;
          }

          .check-tick-path {
            fill: none;
            stroke: #ffd700;
            stroke-width: 5.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
            animation: strokeCheck 0.45s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
          }
        }
      }

      .celebrate-star {
        position: absolute;
        pointer-events: none;

        &.star-1 {
          top: 4px;
          left: 15px;
          color: #ffd700;
          font-size: 1.15rem;
          animation: floatParticle 2.2s infinite ease-in-out;
        }

        &.star-2 {
          top: 10px;
          right: 12px;
          color: #34d399;
          font-size: 1.2rem;
          animation: floatParticle 2.2s infinite ease-in-out 0.6s;
        }

        &.star-3 {
          bottom: 10px;
          right: 18px;
          color: #ffd700;
          font-size: 0.95rem;
          animation: floatParticle 2.2s infinite ease-in-out 1.1s;
        }

        &.star-4 {
          bottom: 12px;
          left: 14px;
          color: #38bdf8;
          font-size: 1rem;
          animation: floatParticle 2.2s infinite ease-in-out 1.5s;
        }
      }
    }

    /* ========================================================
       3. ERROR IMAGE & ANIMATION (Error State)
       ======================================================== */
    .error-graphic-container {
      position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      .error-halo {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
        animation: haloPulse 2s infinite ease-in-out;
      }

      .error-seal {
        position: relative;
        z-index: 2;
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%);
        border: 2px solid #f87171;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.45);
        animation: errorShake 0.4s ease-in-out;

        .error-icon {
          font-size: 2rem;
          color: #ffffff;
        }
      }
    }

    /* ========================================================
       BODY TEXT (Title, Message, Buttons)
       ======================================================== */
    .box-body {
      .box-title {
        font-family: var(--font-heading, 'Outfit', sans-serif);
        font-size: 1.55rem;
        font-weight: 800;
        margin: 0 0 10px 0;
        letter-spacing: -0.3px;
        color: #ffffff;

        .box-success & {
          color: #ffd700;
        }

        .box-loading & {
          color: #38bdf8;
        }

        .box-error & {
          color: #f87171;
        }
      }

      .box-message {
        font-size: 1rem;
        line-height: 1.6;
        color: #cbd5e1;
        margin: 0 0 1.5rem 0;
        font-weight: 400;
      }
    }

    /* Progress bar when sending */
    .sending-progress-section {
      margin-top: 0.5rem;

      .custom-progress-track {
        position: relative;
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 12px;

        .custom-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 45%;
          background: linear-gradient(90deg, #3b82f6, #ffd700, #38bdf8);
          border-radius: 10px;
          animation: progressSlide 1.5s infinite ease-in-out;
        }
      }

      .transmitting-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
        color: #94a3b8;
        background: rgba(255, 255, 255, 0.05);
        padding: 5px 14px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);

        i {
          color: #ffd700;
        }
      }
    }

    /* Action buttons */
    .box-actions {
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;

      .btn-confirm-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 0.85rem 2.2rem;
        font-size: 1rem;
        font-weight: 700;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.25s ease;
        border: none;
        text-transform: uppercase;
        letter-spacing: 0.6px;

        &.btn-success {
          background: linear-gradient(135deg, #ffd700 0%, #eab308 100%);
          color: #0b132b;
          box-shadow: 0 8px 24px rgba(255, 215, 0, 0.35);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(255, 215, 0, 0.5);
            background: linear-gradient(135deg, #ffea79 0%, #ffd700 100%);
          }

          &:active {
            transform: translateY(0);
          }
        }

        &.btn-error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #ffffff;

          &:hover {
            background: #ef4444;
            transform: translateY(-2px);
          }
        }
      }
    }

    /* ========================================================
       KEYFRAME ANIMATIONS
       ======================================================== */
    @keyframes overlayFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes rectanglePopIn {
      from {
        opacity: 0;
        transform: scale(0.88) translateY(15px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes airplaneFloat {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-8px) rotate(2deg);
      }
    }

    @keyframes ringPulse {
      0% {
        transform: translate(-50%, -50%) scale(0.6);
        opacity: 0.8;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.4);
        opacity: 0;
      }
    }

    @keyframes dashMove {
      from { stroke-dashoffset: 22; }
      to { stroke-dashoffset: 0; }
    }

    @keyframes dotBlink {
      0% { opacity: 0.3; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.3); }
    }

    @keyframes sparkleAnim {
      0%, 100% { opacity: 0.2; transform: scale(0.7) rotate(0deg); }
      50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
    }

    @keyframes sealPop {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes haloPulse {
      0%, 100% { transform: scale(0.9); opacity: 0.6; }
      50% { transform: scale(1.2); opacity: 0.9; }
    }

    @keyframes strokeCircle {
      to { stroke-dashoffset: 0; }
    }

    @keyframes strokeCheck {
      to { stroke-dashoffset: 0; }
    }

    @keyframes floatParticle {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(-6px) scale(1.2); opacity: 1; }
    }

    @keyframes errorShake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }

    @keyframes progressSlide {
      0% { left: -45%; width: 35%; }
      50% { width: 55%; }
      100% { left: 100%; width: 35%; }
    }

    /* Mobile Responsive */
    @media (max-width: 540px) {
      .rectangle-box {
        padding: 2.2rem 1.4rem 1.8rem;
        max-width: 95vw;
        border-radius: 16px;
      }

      .box-body .box-title {
        font-size: 1.35rem;
      }

      .box-body .box-message {
        font-size: 0.92rem;
      }

      .btn-confirm-action {
        width: 100%;
        padding: 0.8rem 1.5rem;
      }
    }
  `]
})
export class SnackbarComponent {
  notificationService = inject(NotificationService);

  onBackdropClick(event: MouseEvent) {
    // Only dismiss on background click if not in the loading/sending stage
    if (this.notificationService.currentValue?.type !== 'loading') {
      this.notificationService.hide();
    }
  }
}
