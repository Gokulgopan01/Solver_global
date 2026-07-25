import { Component, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
import gsap from 'gsap';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSwiper') mainSwiperRef!: ElementRef;
  @ViewChild('thumbsSwiper') thumbsSwiperRef!: ElementRef;

  images = [
    {
      url: 'assets/gallery/Budhapest1.jpeg',
      title: 'Professional Consultation',
      heading: 'Budapest, Hungary',
      subheading: 'GOLDEN CITY LIGHTS',
      description: 'Explore and wing your career paths with certified global consultants.'
    },
    {
      url: 'assets/gallery/Austria.png',
      title: 'Study Abroad Guidance',
      heading: 'Vienna, Austria',
      subheading: 'CLASSIC EUROPEAN CHARM',
      description: 'Explore world-class academic institutions and secure your study visas.'
    },
    {
      url: 'assets/gallery/budhapest.jpeg',
      title: 'Work Permit Success',
      heading: 'Budapest, Hungary',
      subheading: 'RIVERSIDE NIGHT VIBES',
      description: 'Unlock direct access to employment opportunities across the Schengen zone.'
    },
    {
      url: 'assets/gallery/Budhapest2.jpeg',
      title: 'Employment Services',
      heading: 'Budapest, Hungary',
      subheading: 'DANUBE EVENING VIEWS',
      description: 'Join stable industrial teams with premium accommodation and flight assistance.'
    },
    {
      url: 'assets/gallery/Budhapest5.jpeg',
      title: 'Hospitality Placements',
      heading: 'Prague, Czechia',
      subheading: 'HISTORIC NIGHTLIFE',
      description: 'Build your career in leading European hotel chains and luxury resorts.'
    },
    {
      url: 'assets/gallery/Budhapest6.mp4',
      title: 'Culinary Opportunities',
      heading: 'Budapest, Hungary',
      subheading: 'COZY WINTER STREETS',
      description: 'Train with top-tier international chefs and manage premium kitchen operations.'
    },
    {
      url: 'assets/gallery/snow1.jpeg',
      title: 'Hotel Operations',
      heading: 'Budapest, Hungary',
      subheading: 'SNOWY CITY ESCAPES',
      description: 'Gain global hospitality experience in luxury hotels in major European cities.'
    },
    {
      url: 'assets/gallery/Budhapest3.mp4',
      title: 'Industrial Placements',
      heading: 'Budapest, Hungary',
      subheading: 'EUROPEAN URBAN LIFE',
      description: 'Connect with expanding warehouse and manufacturing sectors in Central Europe.'
    },
    {
      url: 'assets/gallery/church.jpeg',
      title: 'Professional Network',
      heading: 'Munich, Germany',
      subheading: 'ICONIC CITY LANDMARKS',
      description: 'Bridge your qualifications with international market demands and succeed.'
    }
  ];

  activeIndex = 0;
  selectedImageUrl = '';
  selectedImage: string | null = null;

  ngOnInit() {
    this.selectedImageUrl = this.images[0].url;
  }

  isVideo(url: string): boolean {
    if (!url) return false;

    return url.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/i) != null;
  }
  ngAfterViewInit() {
    const mainEl = this.mainSwiperRef.nativeElement;
    const thumbsEl = this.thumbsSwiperRef.nativeElement;

    // Configure Thumbs Swiper as horizontal at bottom-right
    Object.assign(thumbsEl, {
      direction: 'horizontal',
      slidesPerView: 4,
      spaceBetween: 16,
      centeredSlides: false,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      loop: true,
    });
    thumbsEl.initialize();

    // Configure Main Swiper with autoplay
    Object.assign(mainEl, {
      effect: 'creative',

      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -400],
          opacity: 0,
        },
        next: {
          translate: ['100%', 0, 0],
          opacity: 1,
        },
      },

      speed: 1200,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
    });
    mainEl.initialize();

    // Listen to slide changes to update activeIndex, selectedImageUrl and sync thumbs swiper
    mainEl.addEventListener('swiperslidechange', (event: any) => {
      const swiper = event.detail[0];
      this.activeIndex = swiper.realIndex;
      this.selectedImageUrl = this.images[this.activeIndex].url;

      // Sync thumbs swiper manually so the active thumbnail is always the first one visible
      if (thumbsEl.swiper) {
        thumbsEl.swiper.slideToLoop(this.activeIndex);
      }

      // GSAP Animations for modern, premium transitions
      const activeSlide = swiper.slides[swiper.activeIndex];
      const previousSlide = swiper.slides[swiper.previousIndex];

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // 1. Outgoing slide depth blur transition
        if (previousSlide) {
          const prevBg = previousSlide.querySelector('.full-bg-img, .full-bg-video');
          const prevTexts = previousSlide.querySelectorAll('.slide-subheading, .slide-heading, .slide-description');

          if (prevBg) {
            gsap.to(prevBg, { scale: 0.95, filter: 'blur(4px)', duration: 0.8, ease: 'power2.inOut', overwrite: 'auto' });
          }
          if (prevTexts.length) {
            gsap.to(prevTexts, { opacity: 0, y: -20, duration: 0.4, ease: 'power1.in', overwrite: 'auto' });
          }
        }

        // 2. Incoming slide - Depth blur & Staggered Reveal
        if (activeSlide) {
          const bg = activeSlide.querySelector('.full-bg-img, .full-bg-video');
          const texts = activeSlide.querySelectorAll('.slide-subheading, .slide-heading, .slide-description');
          const textContainer = activeSlide.querySelector('.slide-text-content');

          // Background - scales down from 1.05 and sharpens
          if (bg) {
            gsap.fromTo(bg,
              { scale: 1.05, filter: 'blur(8px)', opacity: 0.8 },
              { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.6, ease: 'power3.out', overwrite: 'auto' }
            );
          }

          // Parallax effect on the text container
          if (textContainer) {
            gsap.fromTo(textContainer,
              { x: 30 },
              { x: 0, duration: 1.6, ease: 'power3.out', overwrite: 'auto' }
            );
          }

          // Staggered text reveal with spring-like physics
          if (texts.length) {
            gsap.fromTo(texts,
              { y: 40, opacity: 0, filter: 'blur(4px)' },
              { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.12, ease: 'back.out(1.2)', delay: 0.2, overwrite: 'auto' }
            );
          }
        }
      }
    });

    // Trigger initial animation for the first slide on load
    setTimeout(() => {
      if (mainEl.swiper) {
        mainEl.swiper.emit('slideChange');
      }
    }, 100);
  }

  setActiveSlide(index: number) {
    const mainSwiper = this.mainSwiperRef.nativeElement.swiper;
    if (mainSwiper) {
      mainSwiper.slideToLoop(index);
    }
  }

  slidePrev() {
    const mainSwiper = this.mainSwiperRef.nativeElement.swiper;
    if (mainSwiper) {
      mainSwiper.slidePrev();
    }
  }

  slideNext() {
    const mainSwiper = this.mainSwiperRef.nativeElement.swiper;
    if (mainSwiper) {
      mainSwiper.slideNext();
    }
  }

  openLightbox(url: string) {
    this.selectedImage = url;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}

