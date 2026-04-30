import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-hire-workers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './hire-workers.component.html',
  styleUrl: './hire-workers.component.scss'
})
export class HireWorkersComponent {
  hireForm = new FormGroup({
    employerName: new FormControl('', [Validators.required]),
    shopName: new FormControl('', [Validators.required]),
    shopType: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    workerType: new FormControl('', [Validators.required]),
    message: new FormControl('')
  });

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Hire Workers', url: '/hire-workers' }];

  availableTalent = [
    { category: 'Hospitality', roles: ['Kitchen Assistant', 'Room Attendant', 'Hotel Receptionist'] },
    { category: 'Retail', roles: ['Sales Person', 'Cashier', 'Store Manager'] },
    { category: 'General Labor', roles: ['Cleaning Staff', 'General Worker', 'Warehouse Staff'] },
    { category: 'Technical', roles: ['Electrician', 'Plumber', 'Construction Worker'] }
  ];

  onSubmit() {
    if (this.hireForm.valid) {
      console.log('Hire Form Submitted:', this.hireForm.value);
      alert('Request sent successfully! Our recruitment team will contact you shortly to match the perfect candidates for your shop.');
      this.hireForm.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  setWorkerType(type: string) {
    this.hireForm.patchValue({ workerType: type });
    const element = document.getElementById('hire-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
