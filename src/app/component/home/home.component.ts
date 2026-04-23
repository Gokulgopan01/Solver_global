// home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Slide {
  id: number;
  title: string;
  description: string;
  imagePath: string;
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
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in, .fade-up, .slide-left, .slide-right')
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
}