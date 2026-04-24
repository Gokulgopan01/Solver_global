// home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

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

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      id: 1,
      title: 'Study Abroad Program',
      description: 'Unlock the treasures of global cultures, create meaningful connections, and grow personally by studying abroad.',
      imagePath: 'assets/home_images/Solver_Home_hero_section.png'
    },
    {
      id: 2,
      title: 'Skilled Migration',
      description: 'Skilled Migration refers to programs designed to attract individuals with specialized skills, qualifications, and experience to work and settle in a specific country.',
      imagePath: 'assets/home_images/Solver_home_hero_study.png'
    },
    {
      id: 3,
      title: 'Work Permits Program',
      description: 'Work permit programs are integral to addressing global labor demands while offering individuals valuable international work experience.',
      imagePath: 'assets/home_images/Solver_Home_hero_office.png'
    },
    {
      id: 4,
      title: 'Visit Visa Program',
      description: 'Uncover unique experiences, make lifelong connections, and grow with a visit visa program.',
      imagePath: 'assets/home_images/Solver_Home_hero_travel.png'
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


  currentIndex: number = 0;
  private intervalId: any;
  private readonly AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

  ngOnInit(): void {
    this.startAutoSlide();
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
  }

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

  onServiceClick(service: Service): void {
    console.log('Service clicked:', service.title);
    // Add your navigation or modal logic here
  }
}