import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  private notificationService = inject(NotificationService);

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Work', url: '/work' }];

  // Main Application Form
  applicationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    educationSummary: new FormControl('', [Validators.required]),
    jobPreference: new FormControl('', [Validators.required]),
    resume: new FormControl(null),
    agreeToPolicy: new FormControl(false, [Validators.requiredTrue])
  });

  // Service Enquiry Form (used for renewal, accommodation, insurance, documentation)
  serviceForm = new FormGroup({
    serviceType: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('Hungary', [Validators.required]),
    message: new FormControl('')
  });

  bottomFeatures = [
    {
      icon: 'fas fa-globe-europe',
      title: 'Work Across Europe',
      description: 'Opportunities in top cities and industries.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: '100% Legal & Safe',
      description: 'We ensure complete legal compliance and safety.'
    },
    {
      icon: 'fas fa-users-cog',
      title: 'End-to-End Support',
      description: 'From application to arrival – we\'re with you.'
    },
    {
      icon: 'fas fa-file-signature',
      title: 'Quick & Easy Process',
      description: 'Simple steps to start your journey abroad.'
    }
  ];

  unskilledJobs = [
    {
      title: 'Kitchen Assistant',
      image: 'assets/work/Kitchen Assistant.png',
      tag: 'High Demand',
      icon: 'fas fa-utensils',
      description: 'Support culinary teams in high-paced international kitchens across Europe.',
      features: [
        { icon: 'fas fa-user-graduate', label: 'Great Career Growth' },
        { icon: 'fas fa-euro-sign', label: 'Competitive Salary' },
        { icon: 'fas fa-globe', label: 'International Exposure' }
      ]
    },
    {
      title: 'Room Attendant',
      image: 'assets/work/Room Attendant.png',
      tag: 'Always Hiring',
      icon: 'fas fa-bed',
      description: 'Ensure guest comfort by maintaining luxury hotel room standards.',
      features: [
        { icon: 'fas fa-shield-alt', label: 'Stable Employment' },
        { icon: 'fas fa-home', label: 'Accommodation Provided' },
        { icon: 'fas fa-graduation-cap', label: 'Training Support' }
      ]
    },
    {
      title: 'Cleaning Staff',
      image: 'assets/work/Cleaning Staff.png',
      tag: 'Urgent Opening',
      icon: 'fas fa-broom',
      description: 'Professional maintenance for corporate and hospitality environments.',
      features: [
        { icon: 'fas fa-clock', label: 'Long Term Opportunities' },
        { icon: 'fas fa-lock', label: 'Safe & Secure Workplace' },
        { icon: 'fas fa-balance-scale', label: 'Work-Life Balance' }
      ]
    },
    {
      title: 'General Worker',
      image: 'assets/work/General Worker.png',
      tag: 'High Demand',
      icon: 'fas fa-hard-hat',
      description: 'Support warehouse, factory, and logistics operations in fast-growing industries across Europe.',
      features: [
        { icon: 'fas fa-briefcase', label: 'Stable Employment' },
        { icon: 'fas fa-home', label: 'Accommodation Support' },
        { icon: 'fas fa-users', label: 'Team-Based Work Environment' }
      ]
    }
  ];

  skilledJobs = [
    {
      title: 'Receptionist',
      image: 'assets/work/Hotel Receptionist.png',
      tag: 'Skilled',
      icon: 'fas fa-user-tie',
      description: 'Manage front desk operations and guest services in professional environments.',
      features: [
        { icon: 'fas fa-language', label: 'Multilingual Environment' },
        { icon: 'fas fa-laptop', label: 'Digital Skills' },
        { icon: 'fas fa-smile', label: 'Guest Satisfaction' }
      ]
    },
    {
      title: 'Chef',
      image: 'assets/work/chef.png',
      tag: 'Expertise',
      icon: 'fas fa-hat-chef',
      description: 'Lead kitchen teams and create culinary masterpieces in premium restaurants.',
      features: [
        { icon: 'fas fa-award', label: 'Culinary Mastery' },
        { icon: 'fas fa-clock', label: 'Flexible Shifts' },
        { icon: 'fas fa-euro-sign', label: 'High Pay Potential' }
      ]
    },
    {
      title: 'Barboy / Barback',
      image: 'assets/work/barboy.png',
      tag: 'Entry Skilled',
      icon: 'fas fa-glass-martini-alt',
      description: 'Support bar operations and maintain beverage service standards in busy venues.',
      features: [
        { icon: 'fas fa-bolt', label: 'Fast-Paced Work' },
        { icon: 'fas fa-cocktail', label: 'Mixology Support' },
        { icon: 'fas fa-moon', label: 'Nightlife Exposure' }
      ]
    },
    {
      title: 'Driver (Heavy)',
      image: 'assets/work/driver.png',
      tag: 'High Demand',
      icon: 'fas fa-truck',
      description: 'Professional logistics and heavy vehicle operation across European borders.',
      features: [
        { icon: 'fas fa-id-card', label: 'Specialized License' },
        { icon: 'fas fa-route', label: 'Long Distance Travel' },
        { icon: 'fas fa-shield-check', label: 'Safety Standards' }
      ]
    }
  ];

  settlementServices = [
    {
      id: 'renewal',
      title: 'Visa & Paperwork Renewal',
      image: 'assets/work/visa_renewal.png',
      description: 'We help you renew your expiring EU and Hungary work visas seamlessly. Don\'t let your status lapse — our legal experts handle the entire paperwork process for you.',
      icon: 'fas fa-file-signature'
    },
    {
      id: 'accommodation',
      title: 'Accommodation in Hungary',
      image: 'assets/work/hungary_accommodation.png',
      description: 'Finding a place to stay in a new country can be hard. We provide safe, comfortable, and affordable accommodation options in Hungary for our workers.',
      icon: 'fas fa-home'
    },
    {
      id: 'insurance',
      title: 'Work & Health Insurance',
      image: 'assets/work/insurance_service.png',
      description: 'Stay protected while working abroad. We assist in securing the necessary medical and work insurance required by EU regulations.',
      icon: 'fas fa-user-shield'
    },
    {
      id: 'documentation',
      title: 'Local Documentation',
      image: 'assets/work/visa_renewal.png',
      description: 'From address cards to local registration, we ensure all your documentation is in order so you can live and work legally in Hungary.',
      icon: 'fas fa-id-card'
    }
  ];

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.applicationForm.patchValue({
        resume: file
      });
    }
  }

  get resumeFileName(): string {
    const file = this.applicationForm.get('resume')?.value as File | null;
    return file?.name || 'Choose File (PDF/DOCX)';
  }

  scrollToForm(serviceTitle?: string) {
    if (serviceTitle) {
      this.serviceForm.patchValue({ serviceType: serviceTitle });
      const element = document.getElementById('service-enquiry-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById('application-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onSubmitApplication() {
    if (this.applicationForm.valid) {
      console.log('Application Submitted:', this.applicationForm.value);
      this.notificationService.showSuccess('Application submitted successfully! We will contact you soon.');
      this.applicationForm.reset();
    } else {
      this.notificationService.showError('Please fill in all required fields correctly.');
    }
  }

  onSubmitServiceEnquiry() {
    if (this.serviceForm.valid) {
      console.log('Service Enquiry Submitted:', this.serviceForm.value);
      this.notificationService.showSuccess(`Your enquiry for ${this.serviceForm.value.serviceType} has been sent!`);
      this.serviceForm.reset();
    } else {
      this.notificationService.showError('Please fill in your contact details correctly.');
    }
  }
}
