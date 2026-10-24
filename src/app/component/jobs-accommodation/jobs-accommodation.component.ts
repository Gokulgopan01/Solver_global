import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-jobs-accommodation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './jobs-accommodation.component.html',
  styleUrl: './jobs-accommodation.component.scss'
})
export class JobsAccommodationComponent implements OnInit {
  private notificationService = inject(NotificationService);

  // Hungary Counties & Capital
  hungaryStates = [
    { name: 'Budapest (Capital)', code: 'Budapest' },
    { name: 'Pest County', code: 'Pest' },
    { name: 'Győr-Moson-Sopron (Győr)', code: 'Gyor-Moson-Sopron' },
    { name: 'Hajdú-Bihar (Debrecen)', code: 'Hajdu-Bihar' },
    { name: 'Csongrád-Csanád (Szeged)', code: 'Csongrad-Csanad' },
    { name: 'Baranya (Pécs)', code: 'Baranya' },
    { name: 'Borsod-Abaúj-Zemplén (Miskolc)', code: 'Borsod-Abauj-Zemplen' },
    { name: 'Fejér (Székesfehérvár)', code: 'Fejer' },
    { name: 'Bács-Kiskun (Kecskemét)', code: 'Bacs-Kiskun' },
    { name: 'Veszprém', code: 'Veszprem' },
    { name: 'Komárom-Esztergom', code: 'Komarom-Esztergom' },
    { name: 'Szabolcs-Szatmár-Bereg (Nyíregyháza)', code: 'Szabolcs-Szatmar-Bereg' },
    { name: 'Jász-Nagykun-Szolnok', code: 'Jasz-Nagykun-Szolnok' },
    { name: 'Heves (Eger)', code: 'Heves' },
    { name: 'Somogy (Kaposvár)', code: 'Somogy' },
    { name: 'Tolna (Szekszárd)', code: 'Tolna' },
    { name: 'Vas (Szombathely)', code: 'Vas' },
    { name: 'Zala (Zalaegerszeg)', code: 'Zala' },
    { name: 'Békés (Békéscsaba)', code: 'Bekes' },
    { name: 'Nógrád (Salgótarján)', code: 'Nograd' }
  ];

  serviceOptions = [
    'Part Time Job',
    'Accommodation',
    'Legal Documentation',
    'Part Time Job & Accommodation'
  ];

  jobOptions = [
    'Kitchen Assistant',
    'Room Attendant',
    'Cleaning Staff',
    'General Worker',
    'Hotel Receptionist',
    'Chef / Cook Assistant',
    'Barboy / Barback',
    'Driver / Food Courier',
    'Warehouse & Logistics Worker',
    'Retail / Store Assistant',
    'Other Part-Time Role'
  ];

  accommodationTypes = [
    'Short Term (1 - 3 Months)',
    'Long Term (6 - 12+ Months)'
  ];

  supportForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    place: new FormControl('', [Validators.required]),
    serviceNeeded: new FormControl('', [Validators.required]),
    jobType: new FormControl(''),
    accommodationType: new FormControl(''),
    message: new FormControl('')
  });

  // Featured job roles for showcase cards
  featuredJobs = [
    {
      title: 'Kitchen Assistant',
      icon: 'fas fa-utensils',
      hourlyRate: '1,800 - 2,400 HUF/hr',
      type: 'Part-Time / Flexible',
      location: 'Budapest & Major Cities',
      desc: 'Assisting culinary chefs with food prep, dish cleaning, and inventory upkeep in busy international kitchens.'
    },
    {
      title: 'Hotel Room Attendant',
      icon: 'fas fa-bed',
      hourlyRate: '1,900 - 2,500 HUF/hr',
      type: 'Day / Weekend Shifts',
      location: 'Budapest, Debrecen, Győr',
      desc: 'Housekeeping and room preparation at premium 3-star to 5-star partner hotels across Hungary.'
    },
    {
      title: 'Warehouse & Logistics',
      icon: 'fas fa-boxes-packing',
      hourlyRate: '2,000 - 2,600 HUF/hr',
      type: 'Flexible Shifts',
      location: 'Pest County & Budapest',
      desc: 'Order picking, packing, and sorting with reputable European logistics and retail fulfillment hubs.'
    },
    {
      title: 'Barboy & Cafe Helper',
      icon: 'fas fa-coffee',
      hourlyRate: '1,800 - 2,300 HUF/hr',
      type: 'Evening / Weekend',
      location: 'Budapest Central',
      desc: 'Assisting baristas, bar managers, table servicing, and customer counter operations in popular venues.'
    },
    {
      title: 'Food Delivery Courier',
      icon: 'fas fa-bicycle',
      hourlyRate: '2,000 - 3,000 HUF/hr',
      type: 'Self-Scheduled',
      location: 'Budapest, Szeged, Pécs',
      desc: 'Bike or e-scooter delivery with top Hungarian delivery platforms with weekly payouts.'
    },
    {
      title: 'Retail Store Assistant',
      icon: 'fas fa-store',
      hourlyRate: '1,850 - 2,400 HUF/hr',
      type: 'Part-Time Shifts',
      location: 'Multiple Hungarian Counties',
      desc: 'Shelf stocking, cashier support, and inventory replenishment at major retail chains.'
    }
  ];

  // Accommodation highlights
  accommodationCards = [
    {
      title: 'Shared Student Rooms',
      type: 'Short & Long Term',
      price: 'From 70,000 HUF/mo',
      icon: 'fas fa-user-friends',
      badge: 'Budget Friendly',
      features: [
        'Furnished bedroom with study desk',
        'High-speed Wi-Fi & utilities included',
        'Official rental agreement for Address Card',
        'Convenient public transit to universities'
      ]
    },
    {
      title: 'Private Studio Apartments',
      type: 'Long Term',
      price: 'From 140,000 HUF/mo',
      icon: 'fas fa-door-closed',
      badge: 'Popular Choice',
      features: [
        'Independent kitchen & private bathroom',
        'Modern appliances (fridge, washing machine)',
        'Immigration-compliant lease contract',
        'Prime locations in Budapest, Debrecen & Pécs'
      ]
    },
    {
      title: 'Temporary Arrival Stay',
      type: 'Short Term (1 - 3 Months)',
      price: 'Flexible Weekly Rates',
      icon: 'fas fa-suitcase-rolling',
      badge: 'Immediate Move-In',
      features: [
        'Move in immediately upon landing',
        'No lock-in contracts',
        'Guidance to transition to long-term flat',
        'Safe neighborhoods with 24/7 check-in'
      ]
    }
  ];

  // FAQs
  faqs = [
    {
      question: 'How many hours can international students work legally in Hungary?',
      answer: 'Third-country nationals holding a Hungarian student residence permit can work up to 24 hours per week during term time, and up to 66 working days or 90 calendar days full-time outside of academic semesters.',
      open: true
    },
    {
      question: 'Do your accommodations provide the contract needed for immigration address registration (Lakcímkártya)?',
      answer: 'Yes! All accommodations we assist with provide legitimate landlord lease agreements and property sheet documentation required by the Hungarian Immigration Office (OIF) for address registration.',
      open: false
    },
    {
      question: 'What documents are required to start a part-time job in Hungary?',
      answer: 'You will need a valid passport, Hungarian Student Residence Permit, Student Status Certificate from your Hungarian university, and a Hungarian Tax Identification Number (Adóazonosító jel / Adókártya). We help you obtain your tax number quickly!',
      open: false
    },
    {
      question: 'Can you help with legal paperwork and tax card registration?',
      answer: 'Absolutely! Our on-the-ground team in Szada and Budapest assists with Hungarian Tax Card (Adókártya) applications, TAJ health insurance, bank account opening, and immigration appointments.',
      open: false
    }
  ];

  ngOnInit() {
    this.supportForm.get('serviceNeeded')?.valueChanges.subscribe(value => {
      this.handleServiceChange(value);
    });
  }

  handleServiceChange(service: string | null) {
    const jobControl = this.supportForm.get('jobType');
    const accControl = this.supportForm.get('accommodationType');

    if (service === 'Part Time Job' || service === 'Part Time Job & Accommodation') {
      jobControl?.setValidators([Validators.required]);
    } else {
      jobControl?.clearValidators();
      jobControl?.setValue('');
    }
    jobControl?.updateValueAndValidity();

    if (service === 'Accommodation' || service === 'Part Time Job & Accommodation') {
      accControl?.setValidators([Validators.required]);
    } else {
      accControl?.clearValidators();
      accControl?.setValue('');
    }
    accControl?.updateValueAndValidity();
  }

  isJobRequired(): boolean {
    const s = this.supportForm.get('serviceNeeded')?.value;
    return s === 'Part Time Job' || s === 'Part Time Job & Accommodation';
  }

  isAccommodationRequired(): boolean {
    const s = this.supportForm.get('serviceNeeded')?.value;
    return s === 'Accommodation' || s === 'Part Time Job & Accommodation';
  }

  selectJob(jobTitle: string) {
    this.supportForm.patchValue({
      serviceNeeded: 'Part Time Job',
      jobType: jobTitle
    });
    this.scrollToForm();
  }

  selectAccommodation(accType: string) {
    const duration = accType.includes('Short') ? 'Short Term (1 - 3 Months)' : 'Long Term (6 - 12+ Months)';
    this.supportForm.patchValue({
      serviceNeeded: 'Accommodation',
      accommodationType: duration
    });
    this.scrollToForm();
  }

  scrollToForm() {
    const el = document.getElementById('support-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  onSubmit() {
    if (this.supportForm.valid) {
      console.log('Hungary Support Request Submitted:', this.supportForm.value);
      this.notificationService.showSuccess(
        'Your request has been received! Our Hungary local support team will reach out to you within 24 hours.'
      );
      this.supportForm.reset();
    } else {
      this.supportForm.markAllAsTouched();
      this.notificationService.showError('Please fill in all required fields marked with *');
    }
  }
}
