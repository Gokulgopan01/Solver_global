import { Component, inject, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { supabase } from '../../supabase.client';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

// Custom validator for file array range (min 1, max 3 photos)
export function fileArrayRangeValidator(min: number, max: number) {
  return (control: any) => {
    const files = control.value;
    if (!files || !Array.isArray(files) || files.length === 0) {
      return { required: true };
    }
    if (files.length < min) {
      return { minPhotos: true };
    }
    if (files.length > max) {
      return { maxPhotos: true };
    }
    return null;
  };
}


@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements AfterViewInit {
  private notificationService = inject(NotificationService);

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elementsToObserve = document.querySelectorAll(
      '.animate-fade-in, .animate-fade-up, .animate-fade-down, .animate-slide-left, .blur-reveal, .slide-left-photo'
    );
    elementsToObserve.forEach(el => observer.observe(el));
  }

  activeSection: string = 'job-placement';

  // Main Application Form
  applicationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    countryCode: new FormControl('+91', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required, Validators.min(18)]),
    educationSummary: new FormControl('', [Validators.required]),
    jobPreference: new FormControl('', [Validators.required]),
    resume: new FormControl(null),
    photos: new FormControl<any>(null, [fileArrayRangeValidator(1, 3)]),
    agreeToPolicy: new FormControl(false, [Validators.requiredTrue])
  });

  countryCodes = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  ];

  get selectedFlag(): string {
    const code = this.applicationForm.get('countryCode')?.value;
    return this.countryCodes.find(c => c.code === code)?.flag ?? '🌐';
  }

  uploadedPhotos: File[] = [];
  photoPreviews: string[] = [];

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

  workersReviews = [
    {
      name: 'Akhil M L',
      image: 'assets/reviews/Akhil ML.jpeg',
      review: 'Solvers Global placed me as a Chef in Debrecen, Hungary. Their support was outstanding from visa processing to arrival. I have been working here for over a year and loving every moment!',
      role: 'Chef',
      location: 'Debrecen, Hungary',
      rating: 5
    },
    {
      name: 'Ajin J S',
      image: 'assets/reviews/Ajin JS.jpeg',
      review: 'I work as a Room Attendant in Budapest thanks to Solvers Global. The entire process was smooth and professional. They truly care about the workers and made my dream of working abroad a reality.',
      role: 'Room Attendant',
      location: 'Budapest, Hungary',
      rating: 5
    },
    {
      name: 'Tijo Jerish',
      image: 'assets/reviews/Tijo Jerish.jpeg',
      review: 'Solvers Global helped me secure a General Worker position in Budapest. Their team guided me through every step. I am truly grateful for their end-to-end support and dedication.',
      role: 'General Worker',
      location: 'Budapest, Hungary',
      rating: 5
    }
  ];

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 1 MB
      if (file.size > maxSize) {
        alert('Compress and upload');
        this.notificationService.showError('File size exceeds 1MB. Please compress and upload.');
        event.target.value = '';
        this.applicationForm.patchValue({
          resume: null
        });
        return;
      }
      this.applicationForm.patchValue({
        resume: file
      });
    }
  }

  onPhotosChange(event: any) {
    if (event.target.files.length > 0) {
      const files: FileList = event.target.files;
      const remainingSlots = 3 - this.uploadedPhotos.length;

      if (files.length > remainingSlots) {
        this.notificationService.showError(`You can only upload up to 3 photos. You have ${remainingSlots} slots remaining.`);
        event.target.value = '';
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          this.notificationService.showError('Only image files are allowed.');
          continue;
        }
        this.uploadedPhotos.push(file);

        // Generate preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photoPreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }

      this.applicationForm.patchValue({
        photos: this.uploadedPhotos.length > 0 ? this.uploadedPhotos : null
      });
      this.applicationForm.get('photos')?.updateValueAndValidity();
      event.target.value = ''; // Reset input to allow selecting same file again
    }
  }

  removePhoto(index: number) {
    this.uploadedPhotos.splice(index, 1);
    this.photoPreviews.splice(index, 1);
    this.applicationForm.patchValue({
      photos: this.uploadedPhotos.length > 0 ? this.uploadedPhotos : null
    });
    this.applicationForm.get('photos')?.updateValueAndValidity();
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

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      this.activeSection = sectionId;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const sections = [
      'job-placement',
      'visa-processing',
      'documentation-support',
      'accommodation-assistance',
      'work-health-insurance',
      'airport-arrival',
      'transportation-support',
      'unskilled-jobs',
      'skilled-jobs'
    ];

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const offset = 180; // Offset for active state triggering (triggers slightly before section reaches top)
    let newActiveSection = this.activeSection;

    for (let i = sections.length - 1; i >= 0; i--) {
      const currentSection = document.getElementById(sections[i]);
      if (currentSection) {
        const sectionTop = currentSection.getBoundingClientRect().top + window.scrollY;
        if (sectionTop - offset <= scrollPosition) {
          newActiveSection = sections[i];
          break;
        }
      }
    }

    if (this.activeSection !== newActiveSection) {
      this.activeSection = newActiveSection;
    }
  }

  async uploadFile(file: File): Promise<string | null> {

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('Solvers bucket')
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage
      .from('Solvers bucket')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }



  async onSubmitApplication() {

    if (this.applicationForm.invalid) {
      this.notificationService.showError(
        'Please fill in all required fields correctly.'
      );
      return;
    }

    const form = this.applicationForm.value;

    // These should be the uploaded file URLs
    const resume = this.applicationForm.get('resume')?.value as File | null;

    let cvUrl: string | null = null;

    if (resume) {
      cvUrl = await this.uploadFile(resume);
    }

    const photoUrls: string[] = [];

    for (const photo of this.uploadedPhotos) {

      const url = await this.uploadFile(photo);

      if (url) {
        photoUrls.push(url);
      }

    }

    const { error } = await supabase
      .from('enquiries')
      .insert([
        {
          enquiry_type: 'job',
          full_name: form.name,
          phone_number: `${form.countryCode}${form.phone}`,
          email: form.email,
          country: form.country,
          DOB: form.dob,
          education_summary: form.educationSummary,
          job_preference: form.jobPreference,
          cv_url: cvUrl,
          photo_1: photoUrls[0] || null,
          photo_2: photoUrls[1] || null,
          photo_3: photoUrls[2] || null,
          message: null,
          status: 'New'
        }
      ]);

    if (error) {
      console.error(error);
      this.notificationService.showError('Something went wrong.');
      return;
    }

    this.notificationService.showSuccess(
      'Application submitted successfully!'
    );

    this.applicationForm.reset();

    this.uploadedPhotos = [];
    this.photoPreviews = [];
  }

}
