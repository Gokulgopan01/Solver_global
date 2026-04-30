import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-study-abroad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BreadcrumbComponent],
  templateUrl: './study-abroad.component.html',
  styleUrl: './study-abroad.component.scss'
})
export class StudyAbroadComponent {
  enquiryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    message: new FormControl('')
  });

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Study Abroad', url: '/study-abroad' }];

  services = [
    {
      title: 'Complete Guidance',
      description: 'Expert advice on university selection, course matching, and career path mapping to ensure your academic success.',
      icon: 'fas fa-graduation-cap'
    },
    {
      title: 'Accommodation Support',
      description: 'We find safe and comfortable student housing, from university dorms to private apartments, tailored to your budget.',
      icon: 'fas fa-home'
    },
    {
      title: 'Documentation & Paperwork',
      description: 'Hassle-free management of all academic and legal documents required for your international enrollment.',
      icon: 'fas fa-file-alt'
    },
    {
      title: 'Stay Back Opportunities',
      description: 'Learn about post-study work permits and career options that allow you to gain international work experience.',
      icon: 'fas fa-briefcase'
    },
    {
      title: 'Visa & Ticketing',
      description: 'End-to-end assistance with student visa applications and competitive travel ticketing for your journey.',
      icon: 'fas fa-passport'
    },
    {
      title: 'Complete Package',
      description: 'A dedicated one-stop solution covering everything from application to landing and initial settlement.',
      icon: 'fas fa-box-open'
    }
  ];

  onSubmit() {
    if (this.enquiryForm.valid) {
      console.log('Study Abroad Enquiry Submitted:', this.enquiryForm.value);
      alert('Thank you for your enquiry! Our education consultant will contact you shortly to guide you through your study abroad journey.');
      this.enquiryForm.reset();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  scrollToEnquiry() {
    const element = document.getElementById('enquiry-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
