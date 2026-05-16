// home.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface Slide {
  id: number;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  imagePath: string;
  buttonText: string;
}

interface Service {
  id: number
  title: string
  description: string
  icon: string
  bgImage: string
}

interface Testimonial {
  id: number;
  name: string;
  service: string;
  country: string;
  rating: number;
  content: string;
  avatar: string;
}

interface ShowcaseProgram {
  id: number;
  name: string;
  country: string;
  image: string;
}

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      id: 1,
      eyebrow: 'YOUR JOURNEY. OUR SUPPORT. BETTER FUTURE.',
      title: 'UNSKILLED JOBS IN',
      titleHighlight: 'EUROPE',
      description: 'We connect you with trusted unskilled job opportunities across European countries. From job placement to accommodation, transportation, and complete paperwork assistance, we support you at every step of your journey.',
      imagePath: 'assets/home_images/Unskilled_Jobs_in_Europe.png',
      buttonText: 'FIND JOBS'
    },
    {
      id: 2,
      eyebrow: 'YOUR JOURNEY. OUR SUPPORT. BETTER FUTURE.',
      title: 'STUDY',
      titleHighlight: 'ABROAD',
      description: 'Pursue your education in top international institutions with our complete guidance. From course selection and university applications to visa processing and accommodation, we support you throughout your study abroad journey.',
      imagePath: 'assets/home_images/Study_Abroad.png',
      buttonText: 'LEARN MORE'
    },
    {
      id: 3,
      eyebrow: 'YOUR JOURNEY. OUR SUPPORT. BETTER FUTURE.',
      title: 'DOCUMENTATION',
      titleHighlight: 'SERVICES',
      description: 'We assist with visa renewals, and all types of legal documentation in Hungary. Our team ensures accurate processing and complete support at every stage.',
      imagePath: 'assets/home_images/Documentation_Services.png',
      buttonText: 'LEARN MORE'
    },
    {
      id: 4,
      eyebrow: 'YOUR JOURNEY. OUR SUPPORT. BETTER FUTURE.',
      title: 'VISIT VISA',
      titleHighlight: 'SERVICES',
      description: 'Travel abroad with confidence through our reliable visit visa assistance. We handle documentation, application processing, and travel guidance to ensure a smooth and hassle-free experience.',
      imagePath: 'assets/home_images/Visit_Visa_Services.png',
      buttonText: 'SEE SERVICES'
    }
  ];

  //our services


  services: Service[] = [
    {
      id: 1,
      title: 'Student Visa',
      description: 'Get complete guidance for studying abroad, from university admissions and documentation to visa approval, accommodation, and travel support for a smooth international education journey.',
      icon: 'fas fa-graduation-cap',
      bgImage: 'assets/home_images/Study_Abroad.png'
    },
    {
      id: 2,
      title: 'Unskilled Jobs in Europe',
      description: 'Secure trusted unskilled job opportunities across Europe with full support including interviews, work permits, visa processing, accommodation, transportation, and settlement assistance.',
      icon: 'fas fa-briefcase',
      bgImage: 'assets/home_images/work.png'
    },
    {
      id: 3,
      title: 'Skilled Jobs in Europe',
      description: 'Advance your international career with verified skilled job placements in Europe, backed by expert guidance for recruitment, documentation, work permits, relocation, and onboarding.',
      icon: 'fas fa-home',
      bgImage: 'assets/home_images/Hotel_Receptionist.png'
    },
    {
      id: 4,
      title: 'Visit Visa',
      description: 'Travel confidently with reliable visit visa assistance, complete documentation support, fast application processing, and professional guidance for a hassle-free travel experience.',
      icon: 'fas fa-chart-line',
      bgImage: 'assets/home_images/visit_visa.png'
    },
    {
      id: 5,
      title: 'Family Sponsorship',
      description: 'Reconnect with your loved ones through smooth and transparent family sponsorship solutions, including complete visa guidance, legal documentation, and end-to-end support.',
      icon: 'fas fa-heart',
      bgImage: 'assets/home_images/family.png'
    },
    {
      id: 6,
      title: 'Accommodation Guidance',
      description: 'Find safe, comfortable, and affordable accommodation abroad with our complete housing assistance, helping you settle smoothly in your new destination.',
      icon: 'fas fa-passport',
      bgImage: 'assets/home_images/Documentation_Services.png'
    }
  ];

  // Showcase Programs
  showcasePrograms: ShowcaseProgram[] = [
    { id: 1, name: 'Bratislava', country: 'Slovakia', image: 'assets/home_images/slovakia.png' },
    { id: 2, name: 'Amsterdam', country: 'Netherlands', image: 'assets/home_images/Armstordam.png' },
    { id: 3, name: 'Dubrovnik', country: 'Croatia', image: 'assets/home_images/croatia.png' },
    { id: 4, name: 'Prague', country: 'Czech Republic', image: 'assets/home_images/Czech Republic.png' },
    { id: 5, name: 'Vienna', country: 'Austria', image: 'assets/home_images/Austria.png' },
  ];

  // Testimonials
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Diljith Dinesh',
      service: 'Visit Visa',
      country: 'Canada',
      rating: 5,
      content: 'They did an excellent job in getting visitor visa for my parents just in 2 months. Excellent service follow up and after service too.',
      avatar: 'https://ui-avatars.com/api/?name=Diljith+Dinesh&background=0F172A&color=fff'
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      service: 'Student Visa',
      country: 'England',
      rating: 5,
      content: 'Solver Global made my university application and visa process completely stress-free. Their counselors are incredibly knowledgeable and supportive.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0F172A&color=fff'
    },
    {
      id: 3,
      name: 'Ahmed Al-Farsi',
      service: 'Skilled Migration',
      country: 'Oman',
      rating: 5,
      content: 'The team guided me through every step of the complex skilled migration process. Their attention to detail ensured my application was approved without delays.',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Farsi&background=0F172A&color=fff'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      service: 'Work Permit',
      country: 'India',
      rating: 4,
      content: 'Highly professional and responsive. They successfully secured my work permit and provided great advice on settling in.',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=0F172A&color=fff'
    },
    {
      id: 5,
      name: 'Ananya Nair',
      service: 'Study Abroad',
      country: 'India',
      rating: 5,
      content: 'Studying abroad felt overwhelming at first, but Solver Global guided me through every step. From university selection to visa approval and accommodation, everything was handled smoothly.',
      avatar: 'https://ui-avatars.com/api/?name=Ananya+Nair&background=0F172A&color=fff'
    }
  ];

  currentIndex: number = 0;
  currentTestimonialIndex: number = 0;

  private intervalId: any;
  private testimonialIntervalId: any;
  private readonly AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

  // Touch swipe tracking
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly SWIPE_THRESHOLD = 50;

  ngOnInit(): void {
    this.startAutoSlide();
    this.startTestimonialAutoSlide();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px"
    });

    // Existing elements
    document.querySelectorAll('.fade-in, .fade-up, .slide-left, .slide-right')
      .forEach(el => observer.observe(el));

    // NEW: Observe service cards for animation
    document.querySelectorAll('.service-card')
      .forEach(el => observer.observe(el));
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.stopTestimonialAutoSlide();
  }

  // --- Hero Carousel Methods ---
  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.resetAutoSlide();
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.resetAutoSlide();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.resetAutoSlide();
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.AUTO_SLIDE_INTERVAL);
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // --- Testimonial Carousel Methods ---
  goToTestimonial(index: number): void {
    if (index >= 0 && index < this.testimonials.length) {
      this.currentTestimonialIndex = index;
      this.resetTestimonialAutoSlide();
    }
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
    this.resetTestimonialAutoSlide();
  }

  prevTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetTestimonialAutoSlide();
  }

  private startTestimonialAutoSlide(): void {
    this.testimonialIntervalId = setInterval(() => {
      this.nextTestimonial();
    }, this.AUTO_SLIDE_INTERVAL);
  }

  private stopTestimonialAutoSlide(): void {
    if (this.testimonialIntervalId) {
      clearInterval(this.testimonialIntervalId);
      this.testimonialIntervalId = null;
    }
  }

  private resetTestimonialAutoSlide(): void {
    this.stopTestimonialAutoSlide();
    this.startTestimonialAutoSlide();
  }

  // --- Swipe Gesture Logic ---
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent, carouselType: 'hero' | 'testimonial'): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe(carouselType);
  }

  private handleSwipe(carouselType: 'hero' | 'testimonial'): void {
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > this.SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swiped left (Next)
        if (carouselType === 'hero') this.nextSlide();
        else this.nextTestimonial();
      } else {
        // Swiped right (Prev)
        if (carouselType === 'hero') this.prevSlide();
        else this.prevTestimonial();
      }
    }
  }

  onServiceClick(service: Service): void {
    console.log('Service clicked:', service.title);
    // Add your navigation or modal logic here
  }

  // --- Scroll Up Button Logic ---
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 500;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}