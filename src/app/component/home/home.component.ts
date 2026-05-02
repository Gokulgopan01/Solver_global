// home.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface Slide {
  id: number;
  title: string;
  description: string;
  imagePath: string;
}

interface Service {
  id: number
  title: string
  description: string
  icon: string
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
  image: string;
}

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
      title: 'Unskilled Jobs in Europe',
      description: 'We connect you with trusted unskilled job opportunities across European countries. From job placement to accommodation, transportation, and complete paperwork assistance, we support you at every step of your journey.',
      imagePath: 'assets/home_images/Unskilled_Jobs_in_Europe.png'
    },
    {
      id: 2,
      title: 'Study Abroad',
      description: 'Pursue your education in top international institutions with our complete guidance. From course selection and university applications to visa processing and accommodation, we support you throughout your study abroad journey.',
      imagePath: 'assets/home_images/Study_Abroad.png'
    },
    {
      id: 3,
      title: 'Citizenship & Documentation Services',
      description: 'We assist with citizenship applications, visa renewals, and all types of legal documentation in European countries. Our team ensures accurate processing and complete support at every stage.',
      imagePath: 'assets/home_images/Documentation_Services.png'
    },
    {
      id: 4,
      title: 'Visit Visa Services',
      description: 'Travel abroad with confidence through our reliable visit visa assistance. We handle documentation, application processing, and travel guidance to ensure a smooth and hassle-free experience.',
      imagePath: 'assets/home_images/Visit_Visa_Services.png'
    }
  ];

  //our services

  services: Service[] = [
    {
      id: 1,
      title: 'Student Visa',
      description: 'Begin your global experience with a Student Visa. Learn, explore, and grow in top educational destinations worldwide.',
      icon: 'fas fa-graduation-cap'
    },
    {
      id: 2,
      title: 'Permanent Residency',
      description: 'Permanent Residency unlocks endless potential. Your new beginning starts here with global settlement solutions.',
      icon: 'fas fa-home'
    },
    {
      id: 3,
      title: 'Work Visa',
      description: 'Unlock international career opportunities with expert work visa guidance and global placement support.',
      icon: 'fas fa-briefcase'
    },
    {
      id: 4,
      title: 'Business Migration',
      description: 'Expand your enterprise internationally. Tailored business visa and investment migration strategies.',
      icon: 'fas fa-chart-line'
    },
    {
      id: 5,
      title: 'Family Sponsorship',
      description: 'Reunite with loved ones through seamless family sponsorship programs across multiple countries.',
      icon: 'fas fa-heart'
    },
    {
      id: 6,
      title: 'Citizenship Solutions',
      description: 'Achieve your dream of second citizenship with expert legal pathways and due diligence.',
      icon: 'fas fa-passport'
    }

  ];

  // Showcase Programs
  showcasePrograms: ShowcaseProgram[] = [
    { id: 1, name: 'Budapest', image: 'assets/home_images/hungary.png' },
    { id: 2, name: 'Fisherman\'s bastion', image: 'assets/home_images/fisherman_bastion.png' },
    { id: 3, name: 'Neuschwanstein Castle', image: 'assets/home_images/Neuschwanstein_castle.png' },
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