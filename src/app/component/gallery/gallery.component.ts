import { Component, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSwiper') mainSwiperRef!: ElementRef;
  @ViewChild('thumbsSwiper') thumbsSwiperRef!: ElementRef;

  images = [
    {
      url: 'assets/gallery/Armstordam.png',
      title: 'Professional Consultation',
      heading: 'Budapest, Hungary',
      subheading: 'EXPERT CONSULTATION',
      description: 'Explore and wing your career paths with certified global consultants.'
    },
    {
      url: 'assets/gallery/Austria.png',
      title: 'Study Abroad Guidance',
      heading: 'Vienna, Austria',
      subheading: 'GLOBAL ACADEMICS',
      description: 'Explore world-class academic institutions and secure your study visas.'
    },
    {
      url: 'assets/gallery/budhapest.jpeg',
      title: 'Work Permit Success',
      heading: 'Warsaw, Poland',
      subheading: 'LEGAL WORK PERMITS',
      description: 'Unlock direct access to employment opportunities across the Schengen zone.'
    },
    {
      url: 'assets/gallery/building.jpeg',
      title: 'Employment Services',
      heading: 'Bratislava, Slovakia',
      subheading: 'WORK FORCE PLACEMENT',
      description: 'Join stable industrial teams with premium accommodation and flight assistance.'
    },
    {
      url: 'assets/gallery/church.jpeg',
      title: 'Hospitality Placements',
      heading: 'Prague, Czechia',
      subheading: 'LUXURY HOSPITALITY',
      description: 'Build your career in leading European hotel chains and luxury resorts.'
    },
    {
      url: 'assets/gallery/night life.jpeg',
      title: 'Culinary Opportunities',
      heading: 'Debrecen, Hungary',
      subheading: 'CULINARY OPERATIONS',
      description: 'Train with top-tier international chefs and manage premium kitchen operations.'
    },
    {
      url: 'assets/gallery/train.jpeg',
      title: 'Hotel Operations',
      heading: 'Budapest, Hungary',
      subheading: 'HOSPITALITY CAREERS',
      description: 'Gain global hospitality experience in luxury hotels in major European cities.'
    },
    {
      url: 'assets/gallery/snow.jpeg',
      title: 'Industrial Placements',
      heading: 'Szada, Hungary',
      subheading: 'INDUSTRIAL LOGISTICS',
      description: 'Connect with expanding warehouse and manufacturing sectors in Central Europe.'
    },
    {
      url: 'assets/gallery/evening.jpeg',
      title: 'Professional Network',
      heading: 'Munich, Germany',
      subheading: 'CAREER NETWORKING',
      description: 'Bridge your qualifications with international market demands and succeed.'
    }
  ];

  activeIndex = 0;
  selectedImageUrl = '';
  selectedImage: string | null = null;

  ngOnInit() {
    this.selectedImageUrl = this.images[0].url;
  }

  ngAfterViewInit() {
    const mainEl = this.mainSwiperRef.nativeElement;
    const thumbsEl = this.thumbsSwiperRef.nativeElement;

    // Configure Thumbs Swiper as horizontal at bottom-right
    Object.assign(thumbsEl, {
      direction: 'horizontal',
      slidesPerView: 3.5,
      spaceBetween: 16,
      centeredSlides: false,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      loop: true,
    });
    thumbsEl.initialize();

    // Configure Main Swiper with autoplay
    Object.assign(mainEl, {
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      thumbs: {
        swiper: thumbsEl,
      },
    });
    mainEl.initialize();

    // Listen to slide changes to update activeIndex and selectedImageUrl
    mainEl.addEventListener('swiperslidechange', (event: any) => {
      const swiper = event.detail[0];
      this.activeIndex = swiper.realIndex;
      this.selectedImageUrl = this.images[this.activeIndex].url;
    });
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

