import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { SnackbarComponent } from './component/snackbar/snackbar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SnackbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isGalleryPage = false;
  lenis: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Force scroll to top on every navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 0);
      const url = event.urlAfterRedirects || event.url || '';
      this.isGalleryPage = url.split('?')[0] === '/success-gallery';
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
        smoothWheel: true,
        wheelMultiplier: 1, // acts like smooth: 1
        touchMultiplier: 0.1, // acts like smoothTouch: 0.1
      });

      const raf = (time: number) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }
  }
}
