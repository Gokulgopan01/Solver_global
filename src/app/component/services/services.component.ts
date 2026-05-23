import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BreadcrumbComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  activeSection: string = 'visa-services';
  private notificationService = inject(NotificationService);

  enquiryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    programLevel: new FormControl('', [Validators.required]),
    message: new FormControl(''),
    agreeToPolicy: new FormControl(false, [Validators.requiredTrue])
  });

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Services', url: '/services' }];

  countries = [
    {
      name: 'Hungary',
      image: 'assets/visit_visa/hungary.png',
      description: 'Explore the heart of Europe with a visit to Hungary. From the majestic Danube to the thermal baths of Budapest, experience a blend of history and luxury.',
      highlights: ['Budapest City Tours', 'Thermal Bath Experiences', 'Danube River Cruises']
    },
    {
      name: 'Slovenia',
      image: 'assets/visit_visa/slovenia.png',
      description: 'Discover the hidden gem of Europe. Slovenia offers breathtaking alpine scenery, emerald rivers, and the charming streets of Ljubljana.',
      highlights: ['Lake Bled Excursions', 'Postojna Cave Tours', 'Alpine Hiking']
    },
    {
      name: 'Austria',
      image: 'assets/visit_visa/austria.png',
      description: 'Immerse yourself in imperial elegance. Austria is famous for its classical music heritage, stunning palaces, and picturesque mountain villages.',
      highlights: ['Vienna Palace Tours', 'Salzburg Music Heritage', 'Hallstatt Village Visits']
    }
  ];

  onSubmit() {
    if (this.enquiryForm.valid) {
      console.log('Enquiry Form Submitted:', this.enquiryForm.value);
      this.notificationService.showSuccess('Thank you for your enquiry! Our team will contact you shortly regarding your visit visa.');
      this.enquiryForm.reset();
    } else {
      this.notificationService.showError('Please fill in all fields correctly before submitting.');
    }
  }

  scrollToEnquiry() {
    const element = document.getElementById('enquiry-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      this.activeSection = id;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['visa-services', 'part-time-jobs', 'accommodation', 'legal-documents', 'family-sponsorship', 'why-choose-us'];
    let currentSection = this.activeSection;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Trigger if the section is currently occupying the upper part of the viewport
        if (rect.top <= 250 && rect.bottom >= 250) {
          currentSection = section;
          break;
        }
      }
    }
    
    if (this.activeSection !== currentSection) {
      this.activeSection = currentSection;
    }
  }
}
