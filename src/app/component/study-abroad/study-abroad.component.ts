import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-study-abroad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './study-abroad.component.html',
  styleUrl: './study-abroad.component.scss'
})
export class StudyAbroadComponent {
  private notificationService = inject(NotificationService);

  enquiryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    preferredCountry: new FormControl('', [Validators.required]),
    programLevel: new FormControl('', [Validators.required]),
    intake: new FormControl('', [Validators.required]),
    message: new FormControl(''),
    agreeToPolicy: new FormControl(false, [Validators.requiredTrue])
  });

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Study Abroad', url: '/study-abroad' }];

  heroFeatures = [
    {
      icon: 'fas fa-passport',
      title: 'Student Visa Support',
      desc: 'End-to-end visa guidance with high success rate.'
    },
    {
      icon: 'fas fa-university',
      title: 'University Admission',
      desc: 'Get admission in top ranked universities.'
    },
    {
      icon: 'fas fa-home',
      title: 'Student Housing',
      desc: 'Safe, comfortable and affordable accommodation.'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Career Stay-Back',
      desc: 'Work opportunities and career guidance abroad.'
    }
  ];

  destinations = [
    {
      id: 'uk',
      name: 'Germany',
      image: '/assets/home_images/Czech Republic.png',
      flag: '/assets/flags/uk.svg'
    },
    {
      id: 'canada',
      name: 'Ireland',
      image: '/assets/home_images/visit_visa.png',
      flag: '/assets/flags/canada.svg'
    },
    {
      id: 'usa',
      name: 'Australia',
      image: '/assets/home_images/croatia.png',
      flag: '/assets/flags/usa.svg'
    },
    {
      id: 'australia',
      name: 'Hungary',
      image: '/assets/home_images/slovakia.png',
      flag: '/assets/flags/australia.svg'
    }
  ];

  whyChooseUs = [
    {
      icon: 'fas fa-user-tie',
      title: 'Expert Counsellors',
      desc: 'Personalized guidance from experienced education experts.'
    },
    {
      icon: 'fas fa-building',
      title: 'University Partnerships',
      desc: 'Strong tie-ups with top universities worldwide.'
    },
    {
      icon: 'fas fa-headset',
      title: 'Complete Support',
      desc: 'From admission to visa and accommodation, we handle all.'
    },
    {
      icon: 'fas fa-file-signature',
      title: 'High Visa Success',
      desc: 'Proven track record with high visa success rate.'
    },
    {
      icon: 'fas fa-plane-arrival',
      title: 'Post-Arrival Support',
      desc: 'We support you even after you reach your destination.'
    }
  ];

  processSteps = [
    {
      step: '01',
      icon: 'fas fa-comments',
      title: 'Career Counselling',
      desc: 'We understand your goals and suggest the best study options.'
    },
    {
      step: '02',
      icon: 'fas fa-search',
      title: 'University Shortlisting',
      desc: 'We help you choose the right university and course.'
    },
    {
      step: '03',
      icon: 'fas fa-file-alt',
      title: 'Admission Assistance',
      desc: 'We assist with applications, documents and offer letters.'
    },
    {
      step: '04',
      icon: 'fas fa-passport',
      title: 'Visa Guidance',
      desc: 'Complete visa support with documentation and filing.'
    },
    {
      step: '05',
      icon: 'fas fa-plane-departure',
      title: 'Pre-Departure & Post-Arrival Support',
      desc: 'From travel guidance to settling abroad, we\'re with you always.'
    }
  ];

  onSubmit() {
    if (this.enquiryForm.valid) {
      console.log('Study Abroad Enquiry Submitted:', this.enquiryForm.value);
      this.notificationService.showSuccess('Thank you for your enquiry! Our experts will get in touch with you shortly.');
      this.enquiryForm.reset();
    } else {
      this.notificationService.showError('Please fill in all required fields and agree to the privacy policy.');
    }
  }

  scrollToEnquiry() {
    const element = document.getElementById('enquiry-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
