import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-visit-visa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BreadcrumbComponent],
  templateUrl: './visit-visa.component.html',
  styleUrl: './visit-visa.component.scss'
})
export class VisitVisaComponent {
  private notificationService = inject(NotificationService);

  enquiryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Visit Visa', url: '/visit-visa' }];

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
}
