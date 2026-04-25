import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  applicationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    educationSummary: new FormControl('', [Validators.required]),
    jobPreferences: new FormControl('', [Validators.required]),
    resume: new FormControl(null, [Validators.required])
  });

  jobRoles = [
    {
      title: 'Room Attendant',
      image: 'assets/home_images/Room Attendant.png',
      description: 'Ensure guest comfort by maintaining luxury hotel room standards.'
    },
    {
      title: 'Kitchen Assistant',
      image: 'assets/home_images/Kitchen Assistant.png',
      description: 'Support culinary teams in high-paced international kitchens.'
    },
    {
      title: 'Cleaning Staff',
      image: 'assets/home_images/Cleaning Staff.png',
      description: 'Professional maintenance for corporate and hospitality environments.'
    },
    {
      title: 'Hotel Receptionist',
      image: 'assets/home_images/Hotel Receptionist.png',
      description: 'Be the face of luxury European hotels and manage guest relations.'
    },
    {
      title: 'General Worker',
      image: 'assets/home_images/General Worker.png',
      description: 'Versatile roles assisting across various service sectors.'
    }
  ];

  features = [
    { title: 'Job placement assistance', icon: 'fas fa-handshake' },
    { title: 'Accommodation support', icon: 'fas fa-hotel' },
    { title: 'End-to-end guidance', icon: 'fas fa-user-shield' },
    { title: 'Trusted international network', icon: 'fas fa-globe' }
  ];

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.applicationForm.patchValue({
        resume: file
      });
    }
  }

  scrollToForm() {
    const element = document.getElementById('application-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      console.log('Application Form Submitted:', this.applicationForm.value);
      alert('Thank you for your application! We will get in touch with you soon.');
      this.applicationForm.reset();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
