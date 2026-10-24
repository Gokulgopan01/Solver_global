import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  private notificationService = inject(NotificationService);

  // Hungary States & Counties
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
    'Transportation',
    'All-in-One Client Package (Jobs + Housing + Docs + Transit)'
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
    'Retail / Supermarket Assistant',
    'Multiple Roles (Batch of Clients)'
  ];

  accommodationTypes = [
    'Short Term (1 - 3 Months)',
    'Long Term (6 - 12+ Months)'
  ];

  agencyForm = new FormGroup({
    agencyName: new FormControl('', [Validators.required]),
    agencyPhone: new FormControl('', [Validators.required]),
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

  // Services offered to partner agencies
  agencyServices = [
    {
      id: 'jobs',
      title: 'Part-Time Jobs for Clients',
      subtitle: 'Legal, verified hourly employment across Hungary',
      image: 'assets/work/Kitchen Assistant.png',
      badge: 'High Demand',
      features: [
        'Compliant with 24-hr weekly student work permit regulations',
        'Direct employer connections in Budapest, Győr, Debrecen & Pest',
        'Competitive hourly pay (1,800 - 3,000 HUF/hr) with prompt payouts',
        'Roles in hospitality, hotels, logistics, cleaning, and dining'
      ]
    },
    {
      id: 'housing',
      title: 'Client Accommodation',
      subtitle: 'Safe, verified student & worker housing with lease contracts',
      image: 'assets/work/hungary_accommodation.png',
      badge: 'Official Leases',
      features: [
        'Official landlord lease contract provided for Address Card (Lakcímkártya)',
        'Flexible short-term arrival flats & budget-friendly long-term rooms',
        'Furnished units with high-speed Wi-Fi, utilities, and kitchen appliances',
        'Close proximity to universities, public metro/tram, and job hubs'
      ]
    },
    {
      id: 'legal',
      title: 'Legal Documentation & Compliance',
      subtitle: 'Fast-track bureaucracy and Hungarian tax card setup',
      image: 'assets/home_images/Documentation_Services.png',
      badge: 'Govt Compliant',
      features: [
        'Hungarian Tax Identification Number (Adókártya) registration',
        'TAJ health insurance card & private EU health coverage guidance',
        'Immigration Office (OIF) residence permit appointment assistance',
        'Local bank account opening guidance and biometric card pickup'
      ]
    },
    {
      id: 'transport',
      title: 'Transportation & Airport Transfers',
      subtitle: 'Dedicated fleet for client arrivals & ground mobility',
      image: 'assets/images/agency_transport.jpg',
      badge: 'VIP Fleet',
      features: [
        'Direct pickup from Budapest Ferenc Liszt International Airport (BUD)',
        'Comfortable vans & executive shuttles with luggage assistance',
        'Intercity transfers to Debrecen, Szeged, Pécs, Győr, and Szada',
        'Campus drop-off and orientation commute tours for fresh student batches'
      ]
    }
  ];

  // Visual showcase highlights
  agencyStats = [
    { number: '150+', label: 'Partner Agencies Worldwide' },
    { number: '2,400+', label: 'Clients Placed in Hungary' },
    { number: '20', label: 'Hungarian Counties Covered' },
    { number: '100%', label: 'Legal & OIF Immigration Compliance' }
  ];

  ngOnInit() {
    this.agencyForm.get('serviceNeeded')?.valueChanges.subscribe(value => {
      this.handleServiceChange(value);
    });
  }

  handleServiceChange(service: string | null) {
    const jobControl = this.agencyForm.get('jobType');
    const accControl = this.agencyForm.get('accommodationType');

    const needsJob = service === 'Part Time Job' || service?.includes('All-in-One');
    const needsAcc = service === 'Accommodation' || service?.includes('All-in-One');

    if (needsJob) {
      jobControl?.setValidators([Validators.required]);
    } else {
      jobControl?.clearValidators();
      jobControl?.setValue('');
    }
    jobControl?.updateValueAndValidity();

    if (needsAcc) {
      accControl?.setValidators([Validators.required]);
    } else {
      accControl?.clearValidators();
      accControl?.setValue('');
    }
    accControl?.updateValueAndValidity();
  }

  isJobRequired(): boolean {
    const s = this.agencyForm.get('serviceNeeded')?.value;
    return s === 'Part Time Job' || !!s?.includes('All-in-One');
  }

  isAccommodationRequired(): boolean {
    const s = this.agencyForm.get('serviceNeeded')?.value;
    return s === 'Accommodation' || !!s?.includes('All-in-One');
  }

  selectService(serviceName: string) {
    this.agencyForm.patchValue({ serviceNeeded: serviceName });
    this.scrollToBooking();
  }

  scrollToBooking() {
    const el = document.getElementById('agency-booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    const el = document.getElementById('contact-details-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (this.agencyForm.valid) {
      console.log('Agency Partnership Form Submitted:', this.agencyForm.value);
      this.notificationService.showSuccess(
        'Thank you! Your agency inquiry has been received. Our Hungary partnership director will contact you within 24 hours.'
      );
      this.agencyForm.reset();
    } else {
      this.agencyForm.markAllAsTouched();
      this.notificationService.showError('Please complete all required fields marked with *');
    }
  }
}
