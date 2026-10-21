import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { supabase } from '../../supabase.client';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-study-abroad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './study-abroad.component.html',
  styleUrl: './study-abroad.component.scss'
})
export class StudyAbroadComponent implements AfterViewInit {
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

  enquiryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    programLevel: new FormControl('', [Validators.required]),
    interestedCourse: new FormControl('', [Validators.required]),
    resume: new FormControl<File | null>(null, [Validators.required]),
    message: new FormControl(''),
    agreeToPolicy: new FormControl(false, [Validators.requiredTrue])
  });

  isFieldInvalid(fieldName: string): boolean {
    const control = this.enquiryForm.get(fieldName);
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.enquiryForm.get(fieldName);
    if (!control || !control.errors) return '';
    if (control.errors['required']) {
      switch (fieldName) {
        case 'name': return 'Full Name is required';
        case 'phone': return 'Phone Number is required';
        case 'email': return 'Email Address is required';
        case 'programLevel': return 'Please select a program level';
        case 'interestedCourse': return 'Please select your interested course';
        case 'resume': return 'CV / Resume upload is mandatory';
        case 'agreeToPolicy': return 'Please agree to the Privacy Policy';
        default: return 'This field is required';
      }
    }
    if (control.errors['email'] || control.errors['pattern']) {
      if (fieldName === 'email') return 'Please enter a valid email address (e.g. name@gmail.com)';
    }
    return 'Invalid field';
  }

  get resumeFileName(): string {
    const file = this.enquiryForm.get('resume')?.value as File | null;
    return file?.name || 'Choose File (PDF/DOCX)';
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 1 MB
      if (file.size > maxSize) {
        this.notificationService.showError('File size exceeds 1MB. Please compress and upload.');
        event.target.value = '';
        this.enquiryForm.patchValue({ resume: null });
        this.enquiryForm.get('resume')?.markAsTouched();
        return;
      }
      this.enquiryForm.patchValue({ resume: file });
      this.enquiryForm.get('resume')?.markAsTouched();
      this.enquiryForm.get('resume')?.updateValueAndValidity();
    }
  }

  async uploadFile(file: File): Promise<string | null> {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('Solvers bucket')
      .upload(fileName, file);

    if (error) {
      return null;
    }

    const { data } = supabase.storage
      .from('Solvers bucket')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }


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



  hungaryUniversities = [
    { name: 'University of Debrecen', image: 'assets/study_abroad/universities/debrecen.jpg', location: 'Debrecen, Hungary', ranking: '#563', rankingSystem: 'QS World University Rankings 2026' },
    { name: 'Budapest University of Technology and Economics', image: 'assets/study_abroad/universities/Economics.jpg', location: 'Budapest, Hungary', ranking: '#711-720', rankingSystem: 'QS World University Rankings 2026' },
    { name: 'Semmelweis University', image: 'assets/study_abroad/universities/Semmelweis.webp', location: 'Budapest, Hungary', ranking: '#201-250', rankingSystem: 'QS World University Rankings 2026' },
    { name: 'Eötvös Loránd University', image: 'assets/study_abroad/universities/Eotvos.png', location: 'Budapest, Hungary', ranking: '#548', rankingSystem: 'QS World University Rankings 2026' },
    { name: 'University of Szeged', image: 'assets/study_abroad/universities/Szegedi.jpg', location: 'Szeged, Hungary', ranking: '#597', rankingSystem: 'QS World University Rankings 2026' },
    { name: 'IBS Budapest', image: 'assets/study_abroad/universities/IBS.jpg', location: 'Budapest, Hungary', ranking: '#1001-1200', rankingSystem: 'QS World University Rankings 2026' },
    { name: 'University of Pécs', image: 'assets/study_abroad/universities/Pecs.webp', location: 'Pécs, Hungary', ranking: '#741-750', rankingSystem: 'QS World University Rankings 2026' }
  ];

  visibleUniversitiesCount = 4;

  showMoreUniversities() {
    this.visibleUniversitiesCount = this.hungaryUniversities.length;
  }

  get visibleUniversities() {
    return this.hungaryUniversities.slice(0, this.visibleUniversitiesCount);
  }

  coursesData = [
    {
      level: 'Bachelor programs',
      categories: [
        {
          name: 'Agriculture Programs',
          courses: ['Agricultural Engineering, BSc']
        },
        {
          name: 'Business Programs',
          courses: [
            'Business Administration and Management, BSc',
            'Commerce and Marketing, BSc'
          ]
        },
        {
          name: 'Engineering Programs',
          courses: [
            'Biochemical Engineering, BSc',
            'Chemical Engineering, BSc',
            'Civil Engineering, BSc',
            'Electrical Engineering, BSc',
            'Engineering Management, BSc',
            'Environmental Engineering, BSc',
            'Mechanical Engineering, BSc',
            'Automotive Production Process Control Specialization',
            'Building Services Engineering Specializaton',
            'Operation and Maintenance Specialization',
            'Mechatronics Engineering, BSc',
            'Vehicle Engineering, BSc'
          ]
        },
        {
          name: 'Health Sciences Programs',
          courses: [
            'Nursing and Patient Care (Physiotherapy), BSc',
            'Nursing and Patient Care (Nurse), BSc',
            'Health Care and Disease Prevention (Public Health), BSc'
          ]
        },
        {
          name: 'Humanities & Education Programs',
          courses: [
            'Communication and Media Studies, BA',
            'English and American Studies, BA',
            'Romance Philology and Cultures (French Studies), BA',
            'Psychology, BA'
          ]
        },
        {
          name: 'IT Programs',
          courses: [
            'Business Informatics, BSc',
            'Computer Science, BSc',
            'Computer Science Engineering, BSc'
          ]
        },
        {
          name: 'Music Programs',
          courses: [
            'Musical Creative Art and Musicology, BA',
            'Classical Performing Arts (Music), BA',
            'Contemporary Music, BA'
          ]
        },
        {
          name: 'Science Programs',
          courses: [
            'Biology, BSc',
            'Biotechnology, BSc',
            'Chemistry, BSc',
            'Earth Sciences, BSc',
            'Mathematics, BSc',
            'Physics, BSc'
          ]
        }
      ]
    },
    {
      level: 'Master programs',
      categories: [
        {
          name: 'Agriculture Programs',
          courses: [
            'Animal Husbandry Engineering, MSc',
            'Agricultural Environmental Management Engineering, MSc',
            'Crop Production Engineering, MSc',
            'Food Safety and Quality Engineering, MSc',
            'Plant Protection, MSc'
          ]
        },
        {
          name: 'Business Program',
          courses: ['International Economy and Business, MSc']
        },
        {
          name: 'Engineering Programs',
          courses: [
            'Chemical Engineering, MSc',
            'Electrical Engineering, MSc',
            'Engineering Management, MSc',
            'Environmental Engineering, MSc',
            'Mechatronical Engineering, MSc',
            'Mechanical Engineering, MSc',
            'Sports Engineering, MSc',
            'Urban Systems Engineering, MSc',
            'Vehicle Engineering, MSc',
            'Postgraduate Diploma in Lean Engineer'
          ]
        },
        {
          name: 'Medical and Health Science Programs',
          courses: [
            'Pharmaceutical Research and Development Manager, MSc',
            'Public Health, MSc',
            'Social Work in Health Care, MSc',
            'Social Work and Social Economics, MA'
          ]
        },
        {
          name: 'Humanities Programs',
          courses: [
            'English Studies, MA',
            'American Studies, MA',
            'Instruction of English as a Foreign Language, MA'
          ]
        },
        {
          name: 'IT Programs',
          courses: [
            'Business Informatics, MSc',
            'Computer Science, MSc',
            'Computer Science Engineering, MSc',
            'Data Science, MSc',
            'Postgraduate Diploma in Artificial Intelligence'
          ]
        },
        {
          name: 'Law Program',
          courses: ['European and International Business Law- LL.M.']
        },
        {
          name: 'Music Program',
          courses: ['Classical Musical Performance, MA']
        },
        {
          name: 'Science Programs',
          courses: [
            'Applied Mathematics, MSc',
            'Biology, MSc',
            'Chemistry, MSc',
            'Environmental Sciences, MSc',
            'Geography, MSc',
            'Geoinformatics, MSc',
            'Hydrobiology - Water Quality Management, MSc',
            'Molecular Biology, MSc',
            'Physics, MSc'
          ]
        }
      ]
    }
  ];

  searchQuery: string = '';
  selectedFilter: string = 'All Programs';

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  enrichCourse(courseName: string, categoryName: string, level: string) {
    let cleanCategory = 'GENERAL';
    let icon = 'fas fa-graduation-cap';
    let desc = 'Unlock world-class education and build your career path.';
    let duration = '3 Years';
    let mode = 'FULL TIME';

    const lowerCat = categoryName.toLowerCase();
    const lowerName = courseName.toLowerCase();

    if (lowerCat.includes('business')) {
      cleanCategory = 'BUSINESS';
      icon = 'fas fa-chart-line';
      desc = 'A comprehensive program focusing on modern corporate strategies, finance, and management.';
    } else if (lowerCat.includes('engineering') || lowerCat.includes('it') || lowerCat.includes('tech')) {
      cleanCategory = 'TECH';
      icon = 'fas fa-laptop-code';
      if (lowerName.includes('computer')) {
        desc = 'Master software development, AI, and systems architecture in a world-class lab.';
        icon = 'fas fa-code';
      } else if (lowerName.includes('mechanical')) {
        desc = 'Study thermodynamics, robotics, and manufacturing systems with hands-on practice.';
        icon = 'fas fa-cog';
      } else if (lowerName.includes('civil')) {
        desc = 'Learn structural design, infrastructure planning, and environmental systems engineering.';
        icon = 'fas fa-building';
      } else {
        desc = 'Hands-on training in technical concepts, industrial applications, and engineering design.';
      }
    } else if (lowerCat.includes('agriculture')) {
      cleanCategory = 'AGRICULTURE';
      icon = 'fas fa-leaf';
      desc = 'Focusing on sustainable farming technologies, modern agronomy, and global food security.';
    } else if (lowerCat.includes('health') || lowerCat.includes('medical') || lowerCat.includes('pharmaceutical')) {
      cleanCategory = 'HEALTH';
      icon = 'fas fa-heartbeat';
      desc = 'Prepare for public health systems, clinical practices, and professional nursing careers.';
    } else if (lowerCat.includes('humanities') || lowerCat.includes('education')) {
      cleanCategory = 'HUMANITIES';
      icon = 'fas fa-book';
      desc = 'Explore literature, communication theories, languages, and human psychology.';
    } else if (lowerCat.includes('music')) {
      cleanCategory = 'MUSIC';
      icon = 'fas fa-music';
      desc = 'Develop advanced performance skills, musicology research, and artistic creation.';
    } else if (lowerCat.includes('science')) {
      cleanCategory = 'SCIENCE';
      icon = 'fas fa-flask';
      desc = 'Investigate fundamental principles of biology, chemistry, physics, and mathematics.';
    } else if (lowerCat.includes('law')) {
      cleanCategory = 'LAW';
      icon = 'fas fa-gavel';
      desc = 'Analyze legal frameworks, corporate governance, and international business laws.';
    }

    if (level.toLowerCase().includes('master')) {
      duration = '2 Years';
    } else {
      if (lowerName.includes('engineering')) {
        duration = '3.5 Years';
      }
    }

    return {
      name: courseName.trim(),
      category: categoryName.replace(' Programs', '').replace(' Program', ''),
      cleanCategory,
      description: desc,
      duration,
      mode,
      icon
    };
  }

  get bachelorCourses() {
    return this.getEnrichedCoursesByLevel('Bachelor programs');
  }

  get masterCourses() {
    return this.getEnrichedCoursesByLevel('Master programs');
  }

  private getEnrichedCoursesByLevel(levelName: string) {
    const levelData = this.coursesData.find(l => l.level === levelName);
    if (!levelData) return [];

    let courses: any[] = [];
    levelData.categories.forEach(cat => {
      cat.courses.forEach(cName => {
        courses.push(this.enrichCourse(cName, cat.name, levelName));
      });
    });

    // Apply active category filter (Engineering, Business, Health)
    if (this.selectedFilter !== 'All Programs' && this.selectedFilter !== "Bachelor's" && this.selectedFilter !== "Master's") {
      const activeFilterLower = this.selectedFilter.toLowerCase();
      courses = courses.filter(c => c.category.toLowerCase().includes(activeFilterLower));
    }

    // Apply search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      courses = courses.filter(c => c.name.toLowerCase().includes(query) || c.category.toLowerCase().includes(query));
    }

    return courses;
  }

  get allCoursesList(): string[] {
    const courses: string[] = [];
    this.coursesData.forEach(level => {
      level.categories.forEach(cat => {
        cat.courses.forEach(course => {
          courses.push(course);
        });
      });
    });
    return [...new Set(courses)].sort();
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery = filterValue;
  }

  clearSearch() {
    this.searchQuery = '';
  }

  scrollCarousel(carouselId: string, direction: 'left' | 'right') {
    const container = document.getElementById(carouselId + '-carousel');
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  applyForCourse(courseName: string) {
    this.enquiryForm.patchValue({
      interestedCourse: courseName,
      programLevel: courseName.includes('BSc') || courseName.includes('BA') ? 'Bachelors' : 'Masters'
    });
    this.scrollToEnquiry();
  }

  get suggestions(): string[] {
    if (!this.searchQuery) return [];
    const query = this.searchQuery.toLowerCase();
    const allCoursesFlat: string[] = [];
    this.coursesData.forEach(level => {
      level.categories.forEach(cat => {
        cat.courses.forEach(course => {
          if (course.toLowerCase().includes(query)) {
            allCoursesFlat.push(course);
          }
        });
      });
    });
    return [...new Set(allCoursesFlat)].slice(0, 5);
  }

  selectSuggestion(course: string) {
    this.searchQuery = course;
  }

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

  studentReviews = [
    {
      name: 'Arjun T J',
      image: 'assets/reviews/Arjun T J.jpeg',
      review: 'Solvers Global helped me secure admission at a top university in Hungary. Their guidance was invaluable throughout the entire process!',
      university: 'Eötvös Loránd University',
      rating: 5
    },
    {
      name: 'Mathangi S R',
      image: 'assets/reviews/Mathangi S R.jpeg',
      review: 'The visa process was seamless thanks to their expert team. Highly recommend Solvers Global for anyone looking to study in Hungary.',
      university: 'University of Debrecen',
      rating: 5
    },
    {
      name: 'Tijo Jerish',
      image: 'assets/reviews/Tijo Jerish.jpeg',
      review: 'Great support from start to finish! They not only helped with admission but also provided excellent post-arrival support.',
      university: 'Budapest University of Technology and Economics',
      rating: 5
    }
  ];

  scrollToEnquiry() {
    const element = document.getElementById('enquiry-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onPolicyChange(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.enquiryForm.markAllAsTouched();
      const controls = this.enquiryForm.controls;
      const errors: string[] = [];
      if (controls.name.invalid) errors.push('Full Name');
      if (controls.phone.invalid) errors.push('Phone Number');
      if (controls.email.invalid) errors.push('Email Address');
      if (controls.programLevel.invalid) errors.push('Program Level');
      if (controls.interestedCourse.invalid) errors.push('Interested Course');
      if (controls.resume.invalid) errors.push('Upload CV / Resume');

      if (errors.length > 0) {
        event.target.checked = false;
        this.enquiryForm.patchValue({ agreeToPolicy: false });
        this.notificationService.showError(`Please fill the following required fields before agreeing: ${errors.join(', ')}`);

        setTimeout(() => {
          const firstInvalid = document.querySelector('.application-card .is-invalid, .application-card .has-error');
          if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    } else {
      this.enquiryForm.patchValue({ agreeToPolicy: false });
    }
  }

  async onSubmit() {

    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      this.notificationService.showError('Please fill in all required fields correctly.');
      setTimeout(() => {
        const firstInvalid = document.querySelector('.application-card .is-invalid, .application-card .has-error');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    const form = this.enquiryForm.value;

    this.notificationService.showLoading('Submitting enquiry...');

    try {
      const resumeFile = this.enquiryForm.get('resume')?.value as File | null;
      let cvUrl: string | null = null;
      if (resumeFile) {
        cvUrl = await this.uploadFile(resumeFile);
        if (!cvUrl) {
          this.notificationService.showError('Failed to upload CV / Resume. Please try again.');
          return;
        }
      }

      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            enquiry_type: 'study',
            full_name: form.name,
            phone_number: form.phone,
            email: form.email,
            program_level: form.programLevel,
            interested_course: form.interestedCourse,
            cv_url: cvUrl,
            message: form.message,
            status: 'New',
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase study enquiry submission error:', error);
        this.notificationService.showError('Submission failed: ' + (error.message || 'Database error'));
        return;
      }

      if (!data || data.length === 0) {
        console.error('Submission failed: No confirmation data returned by Supabase.');
        this.notificationService.showError('Submission failed: Database did not confirm the entry.');
        return;
      }

      this.notificationService.showSuccess('Thank you! Your enquiry has been submitted.');

      this.enquiryForm.reset({
        agreeToPolicy: false
      });
    } catch (err: any) {
      console.error('Unexpected enquiry submission error:', err);
      this.notificationService.showError('An unexpected error occurred while submitting.');
    }
  }
}
