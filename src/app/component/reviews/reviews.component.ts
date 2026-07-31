import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { supabase } from '../../supabase.client';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  avatar?: string;
  country: string;
  role: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {

  reviews: Review[] = [];
  studentReviews: Review[] = [];
  employerReviews: Review[] = [];
  employeeReviews: Review[] = [];
  expandedReviews: { [key: number]: boolean } = {};

  newReview: Partial<Review> = {
    name: '',
    rating: 5,
    country: '',
    comment: '',
    role: ''
  };

  showAll = {
    student: false,
    employer: false,
    employee: false
  };

  loading = false;
  isModalOpen = false;


  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
    this.resetForm();
  }

  resetForm() {
    this.newReview = {
      name: '',
      role: '',
      rating: 5,
      comment: '',
      country: ''
    };
  }

  async ngOnInit() {
    await this.loadReviews();
  }

  // LOAD REVIEWS
  async loadReviews() {

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error loading reviews:', error);
      return;
    }

    this.reviews = (data || []).map((r: any) => ({
      ...r,
      role: r.Role
    }));

    this.availableCountries = [...new Set(this.reviews.map(r => r.country).filter(c => c))].sort();

    this.sortReviewsByRole();
  }

  sortReviewsByRole() {

    this.studentReviews = [];
    this.employerReviews = [];
    this.employeeReviews = [];

    this.reviews.forEach((review) => {

      const role = review.role?.toLowerCase()?.trim();

      // STUDENT
      if (role === 'student') {
        this.studentReviews.push(review);
      }

      // EMPLOYER / WORKER / EMPLOYEE
      else if (
        role === 'employer'
      ) {
        this.employerReviews.push(review);
      }

      // OTHER
      else {
        this.employeeReviews.push(review);
      }
    });
  }

  // Filter States
  searchQuery: string = '';
  filterCategory: string = 'All Categories';
  filterCountry: string = 'All Countries';
  filterSort: string = 'Newest';
  isMobileFilterOpen: boolean = false;
  availableCountries: string[] = [];

  toggleMobileFilter() {
    this.isMobileFilterOpen = !this.isMobileFilterOpen;
  }

  clearFilters() {
    this.searchQuery = '';
    this.filterCategory = 'All Categories';
    this.filterCountry = 'All Countries';
    this.filterSort = 'Newest';
  }

  getFilteredReviews(reviews: Review[], sectionKey: string): Review[] {
    // 1. Filter by Category
    if (this.filterCategory !== 'All Categories') {
      if (this.filterCategory === 'Study Abroad' && sectionKey !== 'student') return [];
      if (this.filterCategory === 'Worker Reviews' && sectionKey !== 'employee') return [];
      if (this.filterCategory === 'Recruiter Reviews' && sectionKey !== 'employer') return [];
    }

    let filtered = [...reviews];

    // 2. Filter by Country
    if (this.filterCountry !== 'All Countries') {
      filtered = filtered.filter(r => r.country === this.filterCountry);
    }

    // 3. Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        (r.name && r.name.toLowerCase().includes(q)) || 
        (r.comment && r.comment.toLowerCase().includes(q)) || 
        (r.role && r.role.toLowerCase().includes(q))
      );
    }

    // 4. Sort
    if (this.filterSort === 'Oldest') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else {
      // Newest by default
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return filtered;
  }

  getVisibleReviews(
    reviews: Review[],
    section: 'student' | 'employer' | 'employee'
  ) {
    const filtered = this.getFilteredReviews(reviews, section);
    return this.showAll[section]
      ? filtered
      : filtered.slice(0, 3);
  }

  toggleView(section: 'student' | 'employer' | 'employee') {
    this.showAll[section] =
      !this.showAll[section];
  }

  getFlagEmoji(country: string): string {
    if (!country) return '🌐';
    const normalized = country.toLowerCase().trim();
    if (normalized.includes('india')) return '🇮🇳';
    if (normalized.includes('uae') || normalized.includes('united arab emirates')) return '🇦🇪';
    if (normalized.includes('australia')) return '🇦🇺';
    if (normalized.includes('canada')) return '🇨🇦';
    if (normalized.includes('uk') || normalized.includes('united kingdom')) return '🇬🇧';
    if (normalized.includes('us') || normalized.includes('united states')) return '🇺🇸';
    if (normalized.includes('germany')) return '🇩🇪';
    if (normalized.includes('france')) return '🇫🇷';
    return '🌐';
  }

  toggleReadMore(reviewId: number) {
    this.expandedReviews[reviewId] =
      !this.expandedReviews[reviewId];
  }

  isExpanded(reviewId: number): boolean {
    return !!this.expandedReviews[reviewId];
  }

  // SUBMIT REVIEW
  async submitReview() {

    if (
      !this.newReview.name ||
      !this.newReview.role ||
      !this.newReview.comment
    ) {
      return;
    }

    this.loading = true;

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          name: this.newReview.name,
          Role: this.newReview.role,
          country: this.newReview.country,
          rating: this.newReview.rating,
          comment: this.newReview.comment
        }
      ])
      .select();

    this.loading = false;

    if (error) {
      console.log('Insert Error:', error);
      return;
    }

    if (data && data.length > 0) {

      const review = data[0];
      this.reviews.unshift({
        ...review,
        role: review.Role
      });

      this.sortReviewsByRole();
    }

    this.closeModal();
  }

  // GET INITIALS
  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  // GET AVATAR COLOR
  getAvatarColor(name: string): string {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
      '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  // STAR DISPLAY
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}