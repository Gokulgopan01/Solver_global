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
    programLevel: new FormControl('', [Validators.required]),
    interestedCourse: new FormControl('', [Validators.required]),
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
            '  a., Automotive Production Process Control Specialization',
            '  b., Building Services Engineering Specializaton',
            '  c., Operation and Maintenance Specialization',
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

  get filteredCourses() {
    let data = this.coursesData;

    // Apply level filter
    if (this.selectedFilter === "Bachelor's") {
      data = data.filter(level => level.level === 'Bachelor programs');
    } else if (this.selectedFilter === "Master's") {
      data = data.filter(level => level.level === 'Master programs');
    } else if (this.selectedFilter !== 'All Programs') {
      // Apply category filter (e.g., Engineering, Business)
      data = data.map(level => ({
        ...level,
        categories: level.categories.filter(cat => cat.name.toLowerCase().includes(this.selectedFilter.toLowerCase()))
      })).filter(level => level.categories.length > 0);
    }

    // Apply search query
    if (!this.searchQuery) {
      return data;
    }
    const query = this.searchQuery.toLowerCase();
    return data.map(level => ({
      ...level,
      categories: level.categories.map(cat => ({
        ...cat,
        courses: cat.courses.filter(course => course.toLowerCase().includes(query))
      })).filter(cat => cat.courses.length > 0)
    })).filter(level => level.categories.length > 0);
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

  expandedCategories: Set<string> = new Set();

  toggleCategory(name: string) {
    if (this.expandedCategories.has(name)) {
      this.expandedCategories.delete(name);
    } else {
      this.expandedCategories.add(name);
    }
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
