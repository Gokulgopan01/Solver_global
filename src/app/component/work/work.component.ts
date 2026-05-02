import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BreadcrumbComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Work', url: '/work' }];

  // Main Application Form
  applicationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    educationSummary: new FormControl('', [Validators.required]),
    jobPreferences: new FormControl('', [Validators.required]),
    resume: new FormControl(null)
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

  jobRoles = [
    {
      title: 'Kitchen Assistant',
      image: 'assets/work/Kitchen Assistant.png',
      description: 'Support culinary teams in high-paced international kitchens across Europe.'
    },
    {
      title: 'Room Attendant',
      image: 'assets/work/Room Attendant.png',
      description: 'Ensure guest comfort by maintaining luxury hotel room standards.'
    },
    {
      title: 'Cleaning Staff',
      image: 'assets/work/Cleaning Staff.png',
      description: 'Professional maintenance for corporate and hospitality environments.'
    },
    {
      title: 'Hotel Receptionist',
      image: 'assets/work/Hotel Receptionist.png',
      description: 'Be the face of luxury European hotels and manage guest relations.'
    },
    {
      title: 'General Worker',
      image: 'assets/work/General Worker.png',
      description: 'Versatile roles assisting across various service sectors.'
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
      image: 'assets/work/visa_renewal.png', // Fallback to renewal image since quota was hit
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
      alert('Thank you for your application! We will get in touch with you soon.');
      this.applicationForm.reset();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  onSubmitServiceEnquiry() {
    if (this.serviceForm.valid) {
      console.log('Service Enquiry Submitted:', this.serviceForm.value);
      alert(`Your enquiry for ${this.serviceForm.value.serviceType} has been sent successfully! Our team will contact you.`);
      this.serviceForm.reset();
    } else {
      alert('Please fill in your contact details correctly.');
    }
  }
}
